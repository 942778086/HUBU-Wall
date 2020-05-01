const query = require('../db')

const messageDao = {
   getAll (tableName, send_id, receive_id) {
      return query(`select * from ${tableName} where ((send_id = ${send_id} && receive_id = ${receive_id}) || (send_id = ${receive_id} && receive_id = ${send_id}))`)
   },
   // 分页
   getAllDialogueInfo (tableName) {
      console.log(`select * from ${tableName}`)
      return query(`select * from ${tableName}`)
  },
}

module.exports = messageDao
