const query = require('../db')

const messageDao = {
     getAll (send_id, receive_id) {
        return query(`select * from message where ((send_id = ${send_id} && receive_id = ${receive_id}) || (send_id = ${receive_id} && receive_id = ${send_id}))`)
     }
}

module.exports = messageDao
