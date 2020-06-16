const router = require('koa-router')()
const messageService = require('../service/messageService')
const baseController = require('../common/baseController')

/**
 * 新建一条聊天信息
 * @type {Router}
 * 这个api其实没有用到，新建一条聊天信息是在webSocket中完成的
 */
module.exports = router.post('/newMessage', (ctx) => { return baseController.addRecord('message', ctx) })

/**
 * 查询某sender与某receiver的message消息
 * @type {Router}
 */
module.exports = router.post('/getAll', async(ctx) => {
  ctx.body = await messageService.getAll('message', ctx)
})

/**
 * 条件查询
 * @type {Router}
 */
module.exports = router.post('/getChatByFileds', (ctx) => { return baseController.getByFields('message', ctx) })

/**
 * 新建一条对话记录
 * @type {Router}
 */
module.exports = router.post('/newDialogueInfo', async(ctx) => { 
  ctx.body = await messageService.addRecord('dialogueInfo', ctx) 
})

/**
 * 获取某sender与所有receiver的对话记录信息
 * @type {Router}
 */
module.exports = router.post('/getAllDialogueInfo', async(ctx) => { 
  ctx.body = await messageService.getAllDialogueInfo('dialogueInfo', ctx)
})

/**
 * 根据id删除特定dialogueInfo
 * @type {Router}
 */
module.exports = router.post('/deleteDialogueInfo', (ctx) => { return baseController.deleteById('dialogueInfo', ctx) })