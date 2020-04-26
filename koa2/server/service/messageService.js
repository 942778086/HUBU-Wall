const messageDao = require('../dao/messageDao')

const messageService = {
    getAll : async function (send_id,receive_id) {
        let data = {}
        data.data = await messageDao.getAll(send_id,receive_id)
        return data
    }
}

module.exports = messageService
