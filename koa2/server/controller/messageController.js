
const messageService = require('../service/messageService')

let messageController = {
  /** 
   * @description 获取某sender与某receiver的所有message消息
  */
  getAll: async function (tableName, ctx) {
    ctx.body = await messageService.getAll(tableName, ctx)
  },
  /** 
   * @description 添加一条对话记录（不是具体的聊天信息）
  */
  addRecord: async function (tableName, ctx) {
    ctx.body = await messageService.addRecord(tableName, ctx)
  },
  /** 
   * @description 获取某sender与所有receiver的对话记录信息
  */
  getAllDialogueInfo: async function (tableName, ctx) {
    ctx.body = await messageService.getAllDialogueInfo(tableName, ctx)
  }
}
module.exports = messageController
