const dynamicDao = require('../dao/dynamicDao');
const userDao = require('../dao/userDao');

const dynamicService = {
    getAll: async function (page) {
        console.log("进入后台的service方法")
        let data = []
        data = await dynamicDao.getAll(page)
        let outData = [];
        let dynamic_user = {
            dynamic: {},
            user: {}
        }
        
        //将每个动态相应的user匹配进去
        for (i = 0; i < data.length; i++) {
            dynamic_user.dynamic = data[i];
            dynamic_user.user = await userDao.getUser(data[i].creator);
            outData.push(dynamic_user)   
        }
        return outData;
    },
    getCount: async function () {
        return await userDao.getCount()
    },
    // getDynamic: function (id) {
    //      return dynamicDao.getDynamic(id)
    // },
    newDynamic: function (data) {
        return dynamicDao.newDynamic(data);
    },
    // editDynamic: function (data) {
    //     return dynamicDao.editArticle(data)
    // },
    // deleteDynamic: function (id) {
    //     return dynamicDao.deleteDynamic(id)
    // }
}

module.exports = dynamicService;
