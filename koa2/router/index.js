const router = require('koa-router')()
const user = require('./user')
const login = require('./login')
const dynamic = require('./dynamic')
const upload = require('./upload')
const comment = require('./comment')
const message = require('./message')

router.get('/', (ctx, next) => {
    ctx.body = "Welcome to HUBU-WALL"
})

router.use('/user', user.routes(), user.allowedMethods())
router.use('/login', login.routes(), login.allowedMethods())
router.use('/dynamic', dynamic.routes(), dynamic.allowedMethods())
router.use('/comment', comment.routes(), comment.allowedMethods())
router.use('/message', message.routes(), message.allowedMethods())
router.post('/upload/ava', (ctx, next) => {
    return upload(ctx, next)
})

module.exports = router
