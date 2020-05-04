const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors')
const logAsync = require('./middleware/log-async')
const router = require('./router/index')
const convert = require('koa-convert')
const config = require('./config')
const bodyparse = require('koa-bodyparser')
const server = require('koa-static')
const ioServer = require('http').Server(app)
const io = require('socket.io')(ioServer)
const socketFunc = require('./server/socket/webSocket')
const sslify = require('koa-sslify').default;
const https = require('https');
const fs = require('fs');

// 程序遇到未捕获异常将不会结束进程
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});
// 获取前端对象
app.use(bodyparse())
// 跨域
app.use(cors())
// 日志中间件
app.use(logAsync())
// 静态资源服务器
app.use(server(__dirname, '/upload'))
// 挂载路由
app.use(router.routes()).use(router.allowedMethods())
// websocket 服务器
io.on('connection', (socket) => {
    socketFunc(socket)
})
// websocket 端口
ioServer.listen(config.wsPort, () => {
    console.log(`🚀 WebSocket Server is running at http://localhost:${config.wsPort}`)
})
// 搭建https服务器
app.use(sslify());
const certOption = {
    key: fs.readFileSync('./server/cert/3_www.wjxweb.cn.key'),
    pem: fs.readFileSync('./server/cert/2_www.wjxweb.cn.pem')
}
let httpsServer = https.createServer(certOption, app.callback());
httpsServer.listen(config.port, () => {
    console.log(`🚀 Server ready at http://localhost:${config.port}`)
})