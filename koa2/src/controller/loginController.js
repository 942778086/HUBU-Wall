const router = require('koa-router')()
const https = require('https')
const dao = require('../common/baseDao')
const baseController = require('../common/baseController')
const config = require('../../config')

// 添加用户
module.exports = router.post('/newUser', (ctx, next) => {
    return baseController.addRecord('user', ctx)
})

/**
 * 服务端登录逻辑
 * 逻辑：此方法可能返回给前端openId或者用户信息
 * 如果返回openId，则前端执行新增用户逻辑
 * 如果返回用户信息，则登录完成
 */
module.exports = router.get('/getOpenId', async (ctx, next) => {
    const code = ctx.query.code;
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appid}&secret=${config.appsecret}&js_code=${code}&grant_type=authorization_code`;
    let p = await new Promise((resolve, reject) => {
        https.get(url, async res => {
            let rawData = "";
            res.on('data', (chunk) => { rawData += chunk });
            res.on('end', async () => {
                let openId = JSON.parse(rawData.toString()).openid;
                try {
                    let dbres = await dao.selectByFields(1, "user", `wx_id="${openId}"`);
                    // 如果dbres的长度为0，说明数据库里面没有这个user，返回前端的数据为openId
                    // 如果dbres的长度不为0，说明数据库里面有这个user，返回前端的数据为这个user的信息
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
