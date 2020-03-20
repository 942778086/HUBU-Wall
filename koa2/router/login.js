const router = require('koa-router')()
const https = require('https')
const dao = require('../server/common/baseDao')

const appid = "wx9122a6cd0208fd3f"  //开发者的appid
const appsecret = "e7fc57c6644aedd7edf5c3aee486a550"   //开发者的appsecret 登入小程序公共平台内查看

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
                    if (res.length == 0){
                        // 如果数据库未查询到该openId对应的user，就往数据库添加一条数据
                        dao.addRecord('wx_id', `"${openId}"`, 'user')
                        console.log('res.length:',res.length)
                    }
                    ctx.body = res
                    console.log('res',res)
                    resolve()
                } catch (e) {
                    console.error(e.message)
                }
            })
        })
    })
})
