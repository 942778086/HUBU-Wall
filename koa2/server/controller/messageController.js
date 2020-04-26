
const messageService = require('../service/messageService')

let messageController = {

  getAll: async function (ctx) {
    const send_id = ctx.request.query.send_id
    const receive_id = ctx.request.query.receive_id
    ctx.body = await messageService.getAll(send_id,receive_id)
  }
}
module.exports = messageController
