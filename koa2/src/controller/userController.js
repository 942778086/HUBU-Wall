const router = require('koa-router')()
const baseController = require('../common/baseController')


/**
 * 列表查询
 * @type {Router}
 */
module.exports = router.get('/getAll', (ctx)=>{ return baseController.getAll('user',ctx) })

/**
 * 主键查询
 * @type {Router}
 */
module.exports = router.get('/getUser', (ctx) => { return baseController.getById('user', ctx) })

/**
 * 新建用户
 * @type {Router}
 */
module.exports = router.post('/newUser', (ctx) => { return baseController.addRecord('user', ctx) })

/**
 * 修改用户
 * @type {Router}
 */
module.exports = router.put('/editUser', (ctx) => { return baseController.updateRecord('user', ctx) })

/**
 * 删除用户
 * @type {this}
 */
module.exports = router.delete('/deleteUser', (ctx) => { return baseController.deleteById('user', ctx) })

/**
 * 根据id列表批量删除用户
 * @type {Router}
 */
module.exports = router.post('/mulDeleteUser', (ctx) => { return baseController.deleteByArr('user', ctx) })

/**
 * 条件查询
 * @type {Router}
 */
module.exports = router.post('/getUserByFileds', (ctx) => { return baseController.getByFields('user', ctx) })

/**
 * 模糊查询
 * @type {Router}
 */
module.exports = router.post('/getUserByLikeFileds', (ctx) => { return baseController.getByLike('user', ctx) })
