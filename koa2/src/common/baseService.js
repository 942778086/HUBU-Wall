const baseDao = require('./baseDao')
const verify = require('../verify/verify')

module.exports = baseService = {
    /**
     * 分页查询
     * @param page
     * @param tableName
     * @returns {Promise<void>}
     */
    async getAll(page, tableName, pageSize) {
        let data = {}
        data.data = await baseDao.getAll(page, tableName, pageSize)
        await baseDao.getCount(tableName)
            .then(res => {
                data.count = res[0].count
            })
        return data
    },
    /**
     * 主键查询
     * @param id
     * @param tableName
     * @returns {Promise<*|void>}
     */
    async getById(id, tableName) {
        return baseDao.getById(id, tableName)
    },

    /**
     * 非主键查询（条件查询）
     * @param tableName
     * @param ctx
     * @returns {Promise<unknown>}
     */
    async getByFields (tableName, ctx) {
        let page = ctx.request.query.page
        let pageSize = ctx.request.query.pageSize
        delete ctx.request.query.page
        delete ctx.request.query.pageSize
        let field = ''
        let property = ''
        let length = Object.getOwnPropertyNames(ctx.request.query).length
        for (i = 0; i < length; i++) {
            property = Object.getOwnPropertyNames(ctx.request.query)[i]
            field = field + property + '="' + ctx.request.query[property] + '" and '
            if (i == length - 1) {
                field = field.substring(0, field.length-4)
            }
        }
        return baseDao.selectByFields(page, tableName, field, pageSize)
    },
    /**
     * 模糊查询
     * @param tableName
     * @param ctx
     * @returns {Promise<void>}
     */
    async getByLike(tableName, ctx) {
        let page
        let data = {}
        if (ctx.request.body.page) {
            page = ctx.request.body.page
        } else {
            page = 1
        }
        let key = Object.keys(ctx.request.body)[0]
        let value = ctx.request.body[key]
        await baseDao.getCount(tableName)
            .then(res => {
                data.count = res[0].count
            })
        data.data = await baseDao.getByLike(page, tableName, key, value)
        return data
    },
    /**
     * 新增记录
     * @param keys
     * @param values
     * @param tableName
     * @returns {Promise<unknown>}
     */
    async addRecord(tableName, ctx) {
            let keysArr = Object.keys(ctx.request.body)
            let valuesArr = [];
            for (const property in ctx.request.body) {
                let prop = ctx.request.body[property]
                if (typeof (prop) === 'string') {
                    valuesArr.push('\'' + prop + '\'')
                } else {
                    valuesArr.push(prop)
                }
            }
            const keys = keysArr.join(',')
            const values = valuesArr.join(',')
            return baseDao.addRecord(keys, values, tableName)
    },
    /**
     * 修改记录
     * @param tableName
     * @param ctx
     * @returns {Promise<unknown>}
     */
    async updateRecord(tableName, ctx) {
        let keysArr = Object.keys(ctx.request.body)
        let valuesArr = []
        for (const property in ctx.request.body) {
            if (typeof (ctx.request.body[property]) === 'string') {
                valuesArr.push('\'' + ctx.request.body[property] + '\'')
            } else {
                valuesArr.push(ctx.request.body[property])
            }
        }
        let sqlArr = []
        let id = ctx.request.body.id
        let length = keysArr.length
        for (let i = 0; i < length; i++) {
            if (i === length - 1) {
                sqlArr[i] = keysArr[i] + '=' + valuesArr[i]
            } else {
                sqlArr[i] = keysArr[i] + '=' + valuesArr[i] + ','
            }
        }
        const sql = sqlArr.join('')
        return baseDao.updateRecord(sql, tableName, id)
    },
    /**
     * 主键删除
     * @param id
     * @param tableName
     * @returns {Promise<unknown>}
     */
    async deleteById(id, tableName) {
        return baseDao.deleteById(id, tableName)
    },
    /** 
     * 检查文本是否包含违规内容
     * @param {*} text
    */
    async checkLabel(appid, appsecret, content) {
        return new Promise(async (resolve, reject) =>{
            let access_token = ''
            let verifyResult = {}
            verifyResult = await verify.verifyContext(appid, appsecret, access_token, content)
            let isLegal = true
            if (verifyResult.errcode == 0) {
                // 不含违规内容
                isLegal = true
            }  else if (verifyResult.errcode == 87014) {
                // 含违规内容
                isLegal = false
            }
            resolve(isLegal)
        })
    }
}
