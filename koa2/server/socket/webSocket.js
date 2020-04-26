const baseService = require('../common/baseService')



module.exports = socketFunc = (socket) => {
    console.log('socket:',socket)
    // socket.on('connect', (data) => {
    socket.on('newConnect', (data) => {
        console.log('data')
        console.log(data)
        let ctx = {
            request: {
                body: {
                    // id: data.id,
                    id: 12,
                    socket_id: socket.id
                }
            }
        }
        baseService.updateRecord('user', ctx)
    })
    socket.on('req', async (data) => {
        let socketId = JSON.parse(JSON.stringify(await baseService.getUser(data.msg.receive_id, 'user')))[0].socket_id
        let ctx = {
            request: {
                body: data.msg
            }
        }
        let reqCtx = {
            request: {
                body: {
                    send_id: data.msg.send_id,
                    receive_id: data.msg.receive_id
                }
            }
        }
        let resCtx = {
            request: {
                body: {
                    send_id: data.msg.receive_id,
                    receive_id: data.msg.send_id
                }
            }
        }
        await baseService.addRecord('message', ctx)
        let sendData = await baseService.getByFields('message', reqCtx)
        let receiveData = await baseService.getByFields('message', resCtx)
        let chatList = sendData.concat((receiveData))
        chatList.sort(function (a,b) {
            return a.send_time > b.send_time ? 1: -1
        })
        socket.to(socketId).emit('res', chatList)
    });
}
