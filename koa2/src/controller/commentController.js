const router = require('koa-router')()
const baseController = require('../common/baseController')

/**
 * 列表查询
 * @type {Router}
 */
module.exports = router.get('/getAll', (ctx)=>{ return baseController.getAll('comment',ctx) })

/**
 * 主键查询
 * @type {Router}
 */
module.exports = router.get('/getComment', (ctx) => { return baseController.getById('comment', ctx) })

/**
 * 新建评论
 * @type {Router}
 */
module.exports = router.post('/newComment', (ctx) => { return baseController.addRecord('comment', ctx) })

/**
 * 修改评论
 * @type {Router}
 */
module.exports = router.put('/editComment', (ctx) => { return baseController.updateRecord('comment', ctx) })

/**
 * 删除评论
 * @type {this}
 */
module.exports = router.delete('/deleteComment', (ctx) => { return baseController.deleteById('comment', ctx) })

/**
 * 根据id列表批量删除评论
 * @type {Router}
 */
module.exports = router.post('/mulDeleteComment', (ctx) => { return baseController.deleteByArr('comment', ctx) })

/**
 * 条件查询
 * @type {Router}
 */
module.exports = router.post('/getCommentByFileds', (ctx) => { return baseController.getByFields('comment', ctx) })

/**
 * 模糊查询
 * @type {Router}
 */
module.exports = router.post('/getCommentByLikeFileds', (ctx) => { return baseController.getByLike('comment', ctx) })
