const router = require('koa-router')()
const baseController = require('../server/common/baseController')
const messageController = require('../server/controller/messageController')

/**
 * 新建message
 * @type {Router}
 */
module.exports = router.post('/newMessage', (ctx) => { return baseController.addRecord('message', ctx) })

/**
 * 查询message
 * @type {Router}
 */
module.exports = router.post('/getAll', (ctx) => { return messageController.getAll(ctx) })

/**
 * 条件查询
 * @type {Router}
 */
module.exports = router.post('/getChatByFileds', (ctx) => { return baseController.getByFields('message', ctx) })

