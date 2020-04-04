const router = require('koa-router')()
const https = require('https')
const dao = require('../server/common/baseDao')
const query = require('../server/db')

const appid = "wx9122a6cd0208fd3f"  //开发者的appid
const appsecret = "e7fc57c6644aedd7edf5c3aee486a550"   //开发者的appsecret 登入小程序公共平台内查看

// 添加用户
module.exports = router.post('/newUser', async (ctx, next) => {
    const params = ctx.request.body
    await query(`insert into user(nick_name,avatar,wx_id,user_new_login,phone_num,student_num,gender,city,province) values('${params.nickName}','${params.avatar}','${params.wxId}','${params.userNewLogin}','${params.phoneNum}','${params.studentNum}','${params.gender}','${params.city}','${params.province}');`)
    ctx.body = {
        message: '添加用户成功'
    }
})

/**
 * 服务端登录逻辑
 * 逻辑：此方法可能返回给前端openId或者用户信息
 * 如果返回openId，则前端执行新增用户逻辑
 * 如果返回用户信息，则登录完成
 */
module.exports = router.get('/getOpenId', async (ctx, next) => {
    const code = ctx.query.code;
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`;
    let p = await new Promise((resolve, reject) => {
        https.get(url, async res => {
            let rawData = "";
            res.on('data', (chunk) => { rawData += chunk });
            res.on('end', async () => {
                let openId = JSON.parse(rawData.toString()).openid;
                try {
                    let dbres = await dao.selectByFields(1, "user", `wx_id="${openId}"`);
                    ctx.body = dbres.length === 0 ? openId : dbres[0];
                    resolve();
                } catch (e) {
                    console.error(e.message);
                    reject();
                }
            })
        })
    })
})
