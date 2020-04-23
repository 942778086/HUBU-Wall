<template>
    <div class="demands" :style="demandsStyle">
        <div @click="displayPublishDiv" class="btn first_publish_btn">二手书发布</div>
        
        <div class="publish" v-if="showPublishDiv">
            <label for="details">细节描述：</label><input v-model="details" type="text" class="details" placeholder="请输入细节描述"/><br>
            <label>价格：</label><input v-model="price" type="text" placeholder="请输入数字"/><br>
            <label>图片：</label><div @click="addPhoto" class="choose_btn">选择图片</div>
            <label v-for="(item, index) in picture" :key="index" >
                <img class="img" :src="item" />
            </label>
            <div :style="btnStyle" class="btn_div">
                <div @click="cancelPublish" class="cancel_btn btn" >取消</div>
                <div @click="publish" class="publish_btn btn" >发布</div>
            </div>
        </div>
        
        <div v-if="showDisplayDiv">
            <div class="show_all"  v-for="(item,index) in demands" :key="index">
                描述：{{ item.details }}<br>
                价格：{{ item.price }}<div class="purchase" @click="purchase(item)">购买</div><br>
                <div v-for="(item2, index2) in item.img_url" :key="index2" class="img_div">
                    <img :src="item2" class="img" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatDatetime } from '@/utils/formatDatetime'
const COS = require("cos-wx-sdk-v5");
const Bucket = "wjxcloud-1258315462";
const Region = "ap-guangzhou";
const cos = new COS({
  getAuthorization: function(options, callback) {
    const authorization = COS.getAuthorization({
      SecretId: "AKID0pRoyuu5JcgVBfhzpQ1azEE7mIZTkduw",
      SecretKey: "zqV1DAtTs2wb0FFzc09boMgqnZ7g3Seb",
      Method: options.Method,
      Pathname: options.Pathname,
      Query: options.Query,
      Headers: options.Headers,
      Expires: 60
    });
    callback({
      Authorization: authorization
    })
  }
})
export default {
    data () {
        return {
            showPublishDiv: false,
            showDisplayDiv: true,
            details: '',
            price: '',
            imgUrl: '',
            picture: [],
            btnStyle: '',
            demandsStyle: '',
            demands: []
        }
    },
    created () {
        this.btnStyle = 'width:' + wx.getSystemInfoSync().windowWidth + 'px;',
        this.demandsStyle = 'width:' + wx.getSystemInfoSync().windowWidth + 'px;height:' + wx.getSystemInfoSync().screenHeight + 'px;background-image: linear-gradient(#b6fbff, #83a4d4);'
    },
    onLoad () {
        this.showPublishDiv = false
        this.getAll()
    },
    methods: {
        getAll () {
            this.$fly.get('/demand/getAll?page=1')
                .then(res => {
                    this.demands = res.data.data
                    this.demands.forEach(item => {
                        if (item.img_url[0] === "") {
                            item.img_url = []
                        }
                        if (item.img_url.indexOf(",") > 0) {
                            item.img_url = item.img_url.split(",")
                        } else {
                            item.img_url = [item.img_url]
                        }
                    })
                })
        },
        displayPublishDiv () {
            this.showPublishDiv = true
            this.showDisplayDiv = false
        },
        addPhoto () {
            const that = this
            wx.chooseImage({
                count: 9, // 默认9
                sizeType: ['original'], // 可以指定是原图还是压缩图，默认用原图
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    for(let i = 0; i < res.tempFiles.length; i++) {
                        const filePath = res.tempFiles[i].path
                        const filename = filePath.substr(filePath.lastIndexOf('/') + 1)
                        cos.postObject({
                            Bucket: Bucket,
                            Region: Region,
                            Key: filename,
                            FilePath: filePath,
                            onProgress: function (info) {
                            }
                        }, function (err, data) {
                            const data1 = (err || data)
                            const imgUrl = 'https://' + data1.Location
                            that.picture.push(imgUrl)
                        })
                    }
                }
            })
        },
        // 对价格做正则处理
        regularPrice (price) {
            const reg = /^\d+$/
            if (reg.test(price) === false) {
                wx.showToast({
                    icon: "none",
                    title: "价格只能为数字格式，请输入数字",
                    duration: 2000
                })
                return false
            } else {
                return true
            }
        },
        publish () {
            if (this.regularPrice(this.price)) {
                this.$fly.post('/demand/newDemand', {
                    price: this.price,
                    img_url: this.picture.join(','),
                    date: formatDatetime(new Date()),
                    publisher_id: this.$store.state.userInfo.user_id,
                    accepter_id: 0,
                    is_deal: 0,
                    details: this.details,
                    which_demand: 1 // 固定传1，代表是二手书
                })
                    .then(res => {
                        if (res.data.affectedRows === 1) {
                            wx.showToast({
                                icon: "none",
                                title: "发布成功",
                                duration: 2000
                            })
                        } else {
                            wx.showToast({
                                icon: "none",
                                title: "发布失败",
                                duration: 2000
                            })
                        }
                    })
                    this.showPublishDiv = false
                    this.showDisplayDiv = true
                    this.getAll()
            }
        },
        cancelPublish () {
            this.showPublishDiv = false
            wx.showToast({
                icon: "none",
                title: "取消发布",
                duration: 2000
            })
        },
        purchase (item) {
            wx.navigateTo({
                url:`/pages/conversation/dialogue/main?publisher_id=${item.publisher_id}`
            })
        }
    }
}
</script>

<style scoped>
.demand{
    width: 300px;
    height: 500px;
    background-image: linear-gradient(#83a4d4,#b6fbff);
}
label{
    line-height: 40px;
}
input{
    border: 1px solid lightgray;
    display: inline-block;
    vertical-align: middle;
    text-indent: 15px;
}
.choose_btn{
    width: 100px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background-color:lightgray;
    color: white;
    margin-left: 60px;
    border-radius: 3px;
}
.img_div{
    display: inline-block;
}
.img {
  width: 100px;
  height: 100px;
  margin: 10px;
}
.btn_div{
    height: 32px;
    text-align: center;
    margin-top: 20px;
}
.btn{
    display: inline-block;
    text-align: center;
    line-height: 30px;
    width: 100px;
    height: 30px;
    color: #FFF;
    margin: 0 10px;
    background-image: linear-gradient(#00B3F1, #00A3EF);
    box-shadow: 0 1px 3px rgba(0, 0, 0, .19), inset 0 1px 0 rgba(255, 255, 255, .4);
    border: solid 1px #0082BE;
    border-radius: 3px;
}
.show_all{
    border-bottom: 1px solid gray;
}
.purchase{
    text-align: center;
    line-height: 30px;
    float: right;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .19), inset 0 1px 0 rgba(255, 255, 255, .4);
    border: solid 1px #0082BE;
    border-radius: 3px;
    width: 100px;
    height: 30px;
}
</style>