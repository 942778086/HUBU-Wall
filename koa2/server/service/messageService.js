const messageDao = require('../dao/messageDao')
const baseDao = require('../common/baseDao')
const baseService = require('../common/baseService')

const messageService = {
    getAll: async function (tableName, ctx) {
        let data = {}
        const send_id = ctx.request.query.send_id
        const receive_id = ctx.request.query.receive_id
        data.data = await messageDao.getAll(tableName, send_id, receive_id)
        return data
    },
    addRecord: async function (tableName, ctx) {
        let keysArr = Object.keys(ctx.request.body)
        let valuesArr = [];
        for (const property in ctx.request.body) {
            let prop = ctx.request.body[property]
            if (typeof (prop) === 'string') {
                valuesArr.push('\'' + prop + '\'')
            } else {
                valuesArr.push(prop)
            }
        }
        const keys = keysArr.join(',')
        const values = valuesArr.join(',')
        let flag = false
        let data = await messageDao.getAllDialogueInfo (tableName)
        data.forEach(element => {
            if (element.receive_id == ctx.request.body.receive_id) {
                // 标志数据库已经存在该对话记录
                flag = true
                ctx.request.body.id = element.id
            }
        })
        // 如果数据库不存在该对话记录，就添加该对话记录;如果数据库已经存在该对话记录，就修改该对话记录，主要是修改last_sentence
        if (!flag) {
            return baseDao.addRecord(keys, values, tableName)
        } else {
            return baseService.updateRecord(tableName, ctx)
        }
    }
}
module.exports = messageService
