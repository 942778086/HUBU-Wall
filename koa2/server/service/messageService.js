const messageDao = require('../dao/messageDao')

const messageService = {
    getAll : async function (user_id,talk_to_id) {
        let data = {}
        data.data = await messageDao.getAll(user_id,talk_to_id)
        return data
    }
}

module.exports = messageService
