const router = require('koa-router')()
// import userService from '../server/userService'
const dynamicController = require('../server/controller/dynamicController')


/**
 * 新增动态
 * @type {Router}
 */
module.exports = router.post('/newDynamic', (ctx) => {
    console.log('进入dynamiccontoroller')
    return dynamicController.newDynamic(ctx)
})

/**
 * 查询动态
 * @type {Router}
 */
module.exports = router.post('/getAll', (ctx) => {
    return dynamicController.getAll(ctx)
})


module.exports = router.post('/upload', (ctx) => {
    return dynamicController.upload(ctx)
})
