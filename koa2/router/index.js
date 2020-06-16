const router = require('koa-router')()
const user = require('../src/controller/userController')
const login = require('../src/controller/loginController')
const dynamic = require('../src/controller/dynamicController')
const demand = require('../src/controller/demandController')
const comment = require('../src/controller/commentController')
const message = require('../src/controller/messageController')

router.get('/', (ctx, next) => {
    ctx.body = "Welcome to HUBU-WALL"
})

router.use('/user', user.routes(), user.allowedMethods())
router.use('/login', login.routes(), login.allowedMethods())
router.use('/dynamic', dynamic.routes(), dynamic.allowedMethods())
router.use('/comment', comment.routes(), comment.allowedMethods())
router.use('/demand', demand.routes(), demand.allowedMethods())
router.use('/message', message.routes(), message.allowedMethods())

module.exports = router
