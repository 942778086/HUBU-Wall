const baseService = require('../common/baseService')
const userService = require('../service/userService')
const messageService = require('../service/messageService')

module.exports = socketFunc = (socket) => {
    socket.on('newConnect', (data) => {
        let ctx = {
            request: {
                body: {
                    id: data.id,
                    socket_id: socket.id
                }
            }
        }
        baseService.updateRecord('user', ctx)
    })
    socket.on('req', async (data) => {
        let receiverSocketId = JSON.parse(JSON.stringify(await userService.getUser(data.msg.receive_id, 'user')))[0].socket_id
        delete data.msg.__newReference
        let ctx = {
            request: {
                body: data.msg
            }
        }
        await baseService.addRecord('message', ctx)
        let ctx2 = {
            request: {
                query: {
                    receive_id: data.msg.receive_id,
                    send_id: data.msg.send_id
                }
            }
        }
        let chatList = await messageService.getAll('message', ctx2)
        socket.to(receiverSocketId).emit('res', chatList)
        socket.emit('res', chatList)
    })
    socket.on('dialogueInfo', async (data) => {
        let ctx = {
            request: {
                query: {
                    // page: data.page,
                    // pageSize: data.pageSize,
                    receive_id: data.receive_id,
                    send_id: data.send_id
                }
            }
        }
        let dialogueInfoRes = await messageService.getAll('dialogueInfo', ctx)
        socket.emit('dialogueInfoRes',dialogueInfoRes)
    })
}
