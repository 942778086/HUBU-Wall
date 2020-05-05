const router = require('koa-router')()
const baseController = require('../server/common/baseController')
const messageController = require('../server/controller/messageController')

/**
 * 新建一条聊天信息
 * @type {Router}
 */
module.exports = router.post('/newMessage', (ctx) => { return baseController.addRecord('message', ctx) })

/**
 * 查询某sender与某receiver的message消息
 * @type {Router}
 */
module.exports = router.post('/getAll', (ctx) => { return messageController.getAll('message', ctx) })

/**
 * 条件查询
 * @type {Router}
 */
module.exports = router.post('/getChatByFileds', (ctx) => { return baseController.getByFields('message', ctx) })

/**
 * 新建一条对话记录
 * @type {Router}
 */
module.exports = router.post('/newDialogueInfo', (ctx) => { 
    return messageController.addRecord('dialogueInfo', ctx) })

/**
 * 获取某sender与所有receiver的对话记录信息
 * @type {Router}
 */
module.exports = router.post('/getAllDialogueInfo', (ctx) => { return messageController.getAllDialogueInfo('dialogueInfo', ctx)
 })

/**
 * 根据id删除特定dialogueInfo
 * @type {Router}
 */
module.exports = router.post('/deleteDialogueInfo', (ctx) => { return baseController.deleteById('dialogueInfo', ctx) })

