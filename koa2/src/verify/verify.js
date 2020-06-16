const axios = require('axios')

const verify = {
    // 检查一段文本是否含有违法违规内容
    verifyContext: function (appid, appsecret, access_token, content) {
        return new Promise ((resolve, reject) => {
            axios({
                method: 'get',
                url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`
            })
            .then(res => {
                access_token = res.data.access_token
                axios({
                    method: 'post',
                    url: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token='+access_token,
                    data: {
                        content: content
                    }
                })
                .then(res => {
                    resolve(res.data)
                })
            })
        })
    },
    // 校验一张图片是否含有违法违规内容。
    // verifyImg: function (appid, appsecret, access_token, media) {
    //     return new Promise ((resolve, reject) => {
    //         axios({
    //             method: 'get',
    //             url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`
    //         })
    //         .then(res => {
    //             access_token = res.data.access_token
    //             axios({
    //                 method: 'post',
    //                 url: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token='+access_token,
    //                 data: {
    //                     media: media
    //                 },
    //                 header: {
    //                     'Content-Type': 'application/x-www-form-urlencoded'
    //                 }
    //             })
    //             .then(res => {
    //                 console.log('校验一张图片是否含有违法违规内容:',res)
    //                 resolve(res.data)
    //             })
    //         })
    //     })
    // }
}
module.exports = verify;
