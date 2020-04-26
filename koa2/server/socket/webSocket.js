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
        let senderSocketId = JSON.parse(JSON.stringify(await userService.getUser(data.msg.send_id, 'user')))[0].socket_id
        console.log('reqData:',data)
        delete data.msg.__newReference
        let ctx = {
            request: {
                body: data.msg
            }
        }
        await baseService.addRecord('message', ctx)
        let chatList = await messageService.getAll(data.msg.receive_id,data.msg.send_id)
        socket.to(receiverSocketId).emit('res', chatList)
        socket.to(senderSocketId).emit('res', chatList)
    });
}
