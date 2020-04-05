const router = require('koa-router')()
const baseController = require('../server/common/baseController')

/**
 * 列表查询
 * @type {Router}
 */
module.exports = router.get('/getAll', (ctx)=>{ return baseController.getAll('dynamic',ctx) })

/**
 * 主键查询
 * @type {Router}
 */
module.exports = router.get('/getDynamic', (ctx) => { return baseController.getById('dynamic', ctx) })

/**
 * 新建动态
 * @type {Router}
 */
module.exports = router.post('/newDynamic', (ctx) => { return baseController.addRecord('dynamic', ctx) })

/**
 * 修改动态
 * @type {Router}
 */
module.exports = router.put('/editDynamic', (ctx) => { return baseController.updateRecord('dynamic', ctx) })

/**
 * 删除动态
 * @type {this}
 */
module.exports = router.delete('/deleteDynamic', (ctx) => { return baseController.deleteById('dynamic', ctx) })

/**
 * 根据id列表批量删除动态
 * @type {Router}
 */
module.exports = router.post('/mulDeleteDynamic', (ctx) => { return baseController.deleteByArr('dynamic', ctx) })

/**
 * 条件查询
 * @type {Router}
 */
module.exports = router.post('/getDynamicByFileds', (ctx) => { return baseController.getByFields('dynamic', ctx) })

/**
 * 模糊查询
 * @type {Router}
 */
module.exports = router.post('/getDynamicByLikeFileds', (ctx) => { return baseController.getByLike('dynamic', ctx) })
