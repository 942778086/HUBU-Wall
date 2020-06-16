const config = {
    /**
     * 后台运行的端口
     */
    port: 3001,
    /**
     * websocket运行的端口
     */
    wsPort: 3002,
    /**
     * 默认的分页查询的数量
     */
    commonPageSize: 6,
    /**
     * 数据库配置
     */
    database: {
        database: 'hubu-wall',
        user: 'root',
        password: '12345678',
        port: '2207',
        host: 'localhost'
    },
    /** 
     * 开发者的appid
    */
    appid: 'wx9122a6cd0208fd3f',
    /** 
     * 开发者的appsecret 登入小程序公共平台内查看
    */
    appsecret: 'e7fc57c6644aedd7edf5c3aee486a550'
}
module.exports = config
