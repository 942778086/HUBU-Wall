const query = require('../db')

const messageDao = {
     getAll (user_id, talk_to_id) {
        return query(`select * from message where ((user_id = ${user_id} && talk_to_id = ${talk_to_id}) || (user_id = ${talk_to_id} && talk_to_id = ${user_id}))`)
     }
}

module.exports = messageDao
