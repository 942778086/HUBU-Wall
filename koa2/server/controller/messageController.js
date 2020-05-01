
const messageService = require('../service/messageService')

let messageController = {

  getAll: async function (tableName, ctx) {
    ctx.body = await messageService.getAll(tableName, ctx)
  },
  addRecord: async function (tablename, ctx) {
    ctx.body = await messageService.addRecord(tablename, ctx)
  }
}
module.exports = messageController
