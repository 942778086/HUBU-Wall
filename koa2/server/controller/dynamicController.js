
const dynamicService = require('../service/dynamicService')

let dynamicController = {

  getAll: async function (ctx) {
    const page = ctx.request.query.page
    ctx.body = await dynamicService.getAll(page)
  },

  newDynamic: async function (ctx) {

    let postData = await ctx.request.body
    //dao层方法有问题
    ctx.body = await dynamicService.newDynamic(postData)
    // ctx.state.data = {
    //   code: 0,
    //   msg: 'success'
    // }
    // console.log("执行成功")
  },


  //上传图片至服务器，返回地址
  upload: async function (ctx) {

    ctx.body = "https://i.loli.net/2017/08/21/599a521472424.jpg";

  },
}
module.exports = dynamicController
