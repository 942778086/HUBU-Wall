const router = require('koa-router')()
const baseController = require('../server/common/baseController')
const baseService = require('../server/common/baseService')
const appid = "wx9122a6cd0208fd3f"  //开发者的appid
const appsecret = "e7fc57c6644aedd7edf5c3aee486a550"   //开发者的appsecret 登入小程序公共平台内查看


/**
 * 列表查询
 * @type {Router}
 */
module.exports = router.get('/getAll', (ctx)=>{ return baseController.getAll('demand',ctx) })

/**
 * 主键查询
 * @type {Router}
 */
module.exports = router.get('/getDemand', (ctx) => { return baseController.getById('demand', ctx) })

/**
 * 根据需求类别查询
 * @type {Router}
 */
module.exports = router.get('/getDemandByDemandKind', (ctx) => { 
    return baseController.getByFields('demand', ctx) })
/**
 * 新建demand
 * @type {Router}
 */
module.exports = router.post('/newDemand', (ctx) => {
    const content = ctx.request.body.details
    baseService.checkLabel(appid, appsecret, content)
    .then(isLegal => {
        if (isLegal) {
            // 不含违规内容
            return baseController.addRecord('demand', ctx)
        } else {
            // 含违规内容
            return '内容违规'
        }
    })
})

/**
 * 修改demand
 * @type {Router}
 */
module.exports = router.put('/editDemand', (ctx) => { return baseController.updateRecord('demand', ctx) })

/**
 * 删除demand
 * @type {this}
 */
module.exports = router.delete('/deleteDemand', (ctx) => { return baseController.deleteById('demand', ctx) })

/**
 * 根据id列表批量删除demand
 * @type {Router}
 */
module.exports = router.post('/mulDeleteDemand', (ctx) => { return baseController.deleteByArr('demand', ctx) })

