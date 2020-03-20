const router = require('koa-router')()
const https = require('https')
const dao = require('../server/common/baseDao')
const query = require('../server/db')

const appid = "wx9122a6cd0208fd3f"  //开发者的appid
const appsecret = "e7fc57c6644aedd7edf5c3aee486a550"   //开发者的appsecret 登入小程序公共平台内查看

// 添加用户
module.exports = router.post('/newUser', async (ctx, next) =>{
    console.log('ctx',ctx.request.body)
    const params = ctx.request.body
        let res = await query(`insert into user(nick_name,avatar,wx_id,user_new_login,phone_num,student_num,gender,city,province) values('${params.nickName}','${params.avatar}','${params.openId}','${params.userNewLogin}','${params.phoneNum}','${params.studentNum}','${params.gender}','${params.city}','${params.province}');`)
        console.log('res')
        console.log(res)
        ctx.body = {
            message: '添加用户成功'
        }    
})

// 获取openId
module.exports = router.get('/getOpenId', async(ctx, next) => {
    console.log(ctx)
    console.log("code:", ctx.query.code) // 获取前端参数
    const code = ctx.query.code
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`
    let p = await new Promise ((resolve,reject) =>{
        https.get(url, async res => {
            let openId;
            res.on('data', d => {
                console.log('openid:',JSON.parse(d.toString()).openid)
                openId = JSON.parse(d.toString()).openid
            })
            res.on('end', async () => {
                try {
                    res = await dao.selectByFields(1, "user", `wx_id="${openId}"`)
                    ctx.body = openId
                    console.log('res',res)
                    resolve()
                } catch (e) {
                    console.error(e.message)
                }
            })
        })
    })
})
