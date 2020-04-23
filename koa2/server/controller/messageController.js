
const messageService = require('../service/messageService')

let messageController = {

  getAll: async function (ctx) {
    const user_id = ctx.request.query.user_id
    const talk_to_id = ctx.request.query.talk_to_id
    ctx.body = await messageService.getAll(user_id,talk_to_id)
  }
}
module.exports = messageController
