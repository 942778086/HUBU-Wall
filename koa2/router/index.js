const router = require('koa-router')()
const user = require('./user')
const login = require('./login')
const dynamic = require('./dynamic')
const upload = require('./upload')

// const controller = require('../server/controller/dynamicController')

router.get('/', (ctx, next) => {
    ctx.body = "Welcome to HUBU-WALL"
})

router.use('/user', user.routes(), user.allowedMethods())
router.use('/login', login.routes(), login.allowedMethods())
router.use('/dynamic', dynamic.routes(), dynamic.allowedMethods())
router.post('/upload/ava', (ctx, next) => {
    return upload(ctx, next)
})


// 发表动态信息路由
// router.post('/publish/submit',controller)



module.exports = router
