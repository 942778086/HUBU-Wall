const baseService = require('./baseService')

module.exports = baseController = {
    /**
     * 获取分页列表
     * @param tableName
     * @param ctx
     * @returns {Promise<void>}
     */
    async getAll(tableName, ctx) {
        const page = ctx.request.query.page
        const pageSize = ctx.request.query.pageSize
        ctx.body = await baseService.getAll(page, tableName, pageSize)
    },
    /**
     * 主键查询
     * @param tableName
     * @param ctx
     * @returns {Promise<void>}
     */
    async getById(tableName, ctx) {
        const id = ctx.request.query.id
        ctx.body = await baseService.getById(id, tableName)
    },
    /**
     * 非主键查询(多条件查询)
     * @param tableName
     * @param ctx
     * @returns {Promise<void>}
     */
    async getByFields(tableName, ctx) {
        ctx.body = await baseService.getByFields(tableName, ctx)
    },
    /**
     * 非主键查询（模糊查询）
     * @param tableName
     * @param ctx
     * @returns {Promise<void>}
     */
    async getByLike(tableName, ctx) {
        ctx.body = await baseService.getByLike(tableName, ctx)
    },
    /**
     * 新增记录
     * @param tableName
     * @param ctx
     * @returns {Promise<void>}
     */
    async addRecord(tableName, ctx) {
        ctx.body = await baseService.addRecord(tableName, ctx)
    },
    /**
     * 修改记录
     * @param tableName
     * @param ctx
     * @returns {Promise<void>}
     */
    async updateRecord(tableName, ctx) {
        ctx.body = await baseService.updateRecord(tableName, ctx)
    },
    /**
     * 根据主键删除
     * @param tableName
     * @param ctx
     * @returns {Promise<void>}
     */
    async deleteById(tableName, ctx) {
        const id = ctx.request.query.id
        ctx.body = await baseService.deleteById(id, tableName)
    },
    /**
     * 根据id数组批量删除
     * @param tableName
     * @param ctx
     * @returns {Promise<void>}
     */
    async deleteByArr(tableName, ctx) {
        let res
        let length = ctx.request.body.arr.length
        for (let i = 0; i < length; i++) {
            res = await baseService.deleteById(ctx.request.body.arr[i], tableName)
        }
        ctx.body = res
    }
}
