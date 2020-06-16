const query = require('../db')

const messageDao = {
   // 获取某sender与某receiver的所有message消息
   getAll (tableName, send_id, receive_id) {
      console.log(`select * from ${tableName} where ((send_id = ${send_id} && receive_id = ${receive_id}) || (send_id = ${receive_id} && receive_id = ${send_id}))`)
      return query(`select * from ${tableName} where ((send_id = ${send_id} && receive_id = ${receive_id}) || (send_id = ${receive_id} && receive_id = ${send_id}))`)
   },
   // 获取某sender与所有receiver的对话记录信息
   getAllDialogueInfo (tableName, sendOrReceive_id) {
      console.log(`select * from ${tableName} where send_id=${sendOrReceive_id} || receive_id=${sendOrReceive_id}`)
      return query(`select * from ${tableName} where send_id=${sendOrReceive_id} || receive_id=${sendOrReceive_id}`)
  },
}

module.exports = messageDao
