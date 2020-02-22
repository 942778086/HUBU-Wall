const router = require('koa-router')()
const user = require('./user')
const upload = require('./upload')

router.get('/', (ctx, next) => {
    ctx.body = "Welcome to HUBU-WALL"
})

router.use('/user', user.routes(), user.allowedMethods())

router.post('/upload/ava', (ctx, next) => {
    return upload(ctx, next)
})

module.exports = router
