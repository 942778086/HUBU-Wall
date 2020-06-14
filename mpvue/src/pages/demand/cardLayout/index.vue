<template>
    <div class="demands" :style="demandsStyle">
        <div class="top_btn_div">
            <button class="top_publish_btn" :style="topPublishBtnStyle" @click="displayPublishDiv">发布{{demand_kind}}</button>
        </div>
         
        <div class="publish_div" v-if="showPublishDiv">
            <label for="details">细节描述：</label><input v-model="details" type="text" class="details" placeholder="请输入细节描述"/><br>
            <label>价格：</label><input v-model="price" type="text" placeholder="请输入数字"/><br>
            <label class="picture_label">图片：</label><div @click="addPhoto" class="choose_picture_btn">选择图片</div>
            <label v-for="(item, index) in pictures" :key="index" >
                <img class="img" :src="item" />
            </label>
        </div>

        <div class="btn_div" v-if="showPublishDiv">
            <div @click="cancelPublish" class="buttom_cancel_btn btn" >取消</div>
            <div @click="publish" class="buttom_publish_btn btn" >发布</div>
        </div>
        
        <div class="homepage-demand" v-if="!showPublishDiv">
            <div class="homepage-demand-item" v-for="(item, index) in demands" :key="index" @click="queryDetails(item)">
                <div class="img-room">
                    <img :src="item.img_url[0]" mode="widthFix" class="demand-item-img" />
                </div>
                <div class="info-room">
                    <p class="detail">{{ item.details }}</p>
                    <div class="publisher">来自{{ item.publisher_name }}</div>
                    <div v-if="item.price == 0" class="price-free">FREE</div>
                    <div v-else class="price">
                        ￥{{ item.price }}
                        <button class="delete_btn" @click.stop="deleteDemand(item)"></button>
                    </div> 
                    <div class="time">{{ item.date }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NaiveBayes from 'naivebayes'
import { formatDatetime, formatDateFriendly, transferStandardToBeijingTime } from '@/utils/formatDatetime'
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

// 实例化（创建分类器）
const classifier = new NaiveBayes()

// 学习文本和分类
classifier.learn('书', '二手书')
classifier.learn('闲置', '闲置物')
classifier.learn('房子', '租房')

// 导出学习数据，serialize the classifier's state as a JSON string.
const stateJson = classifier.toJson()

// 导入学习数据，load the classifier back from its JSON representation.
const revivedClassifier = NaiveBayes.fromJson(stateJson)

export default {
    data () {
        return {
            showPublishDiv: false,
            details: '',
            price: '',
            imgUrl: '',
            pictures: [],
            demandsStyle: '',
            demands: [],
            demand_kind: 0,
            page: 1,
            topPublishBtnStyle: ''
        }
    },
    created () {
    },
    onLoad: function (options) {
        this.demand_kind = options.demand_kind
        this.showPublishDiv = false
        this.page = 1
        this.demands = []
        this.setNavigationBarTitleText()
        this.getAll(this.page)
    },
    onReachBottom: function() {
        if (this.demands.length % 6 == 0){
            // 这个地方逻辑不完善，取余为0，可能接下来还有数据，可能接下来没有数据了,这个后面完善
            this.page++
            this.getAll(this.page)
        } else {
            // 如果对6取余不为0，则一定无更多的数据
            wx.showToast({
                icon: "none",
                title: "无更多数据",
                duration: 2000
            })
        }
    },
    methods: {
        // 设置navigationBarTitleText
        setNavigationBarTitleText () {
            wx.setNavigationBarTitle({
                title: this.demand_kind
            })
        },
        getAll (page) {
            this.$fly.get(`/demand/getDemandByDemandKind?demand_kind=${this.demand_kind}&&is_deal=${0}&&pageSize=6&&page=${page}`)
                .then(res => {
                    res.data.forEach(item => {
                        if (!item.img_url) {
                            item.img_url = []
                        }
                        if (item.img_url.indexOf(",") > 0) {
                            item.img_url = item.img_url.split(",")
                        } else {
                            item.img_url = [item.img_url]
                        }
                        item.date = transferStandardToBeijingTime(item.date)
                    })
                    this.demands = this.demands.concat(res.data)
                })
        },
        displayPublishDiv () {
            this.topPublishBtnStyle = 'background: snow;color: #A2C6E7;'
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
                    const length = res.tempFiles.length
                    for(let i = 0; i < length; i++) {
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
                            that.pictures.push(imgUrl)
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
        empty () {
            this.details = ''
            this.price = ''
            this.pictures = []
        },
        // 发布新的需求
        publish () {
            if (this.regularPrice(this.price)) {
                this.$fly.post('/demand/newDemand', {
                    price: this.price,
                    img_url: this.pictures.join(','),
                    date: formatDatetime(new Date()),
                    publisher_id: this.$store.state.userInfo.id,
                    publisher_name: this.$store.state.userInfo.nick_name,
                    accepter_id: 0,
                    is_deal: 0,
                    details: this.details,
                    demand_kind: this.demand_kind // 以后demand_kind不在前端传，在后端通过对details的内容进行分析，再取对应之值
                })
                    .then(res => {
                        if (res.data.affectedRows === 1) {
                            wx.showToast({
                                icon: "none",
                                title: "发布成功",
                                duration: 2000
                            })
                            this.page = 1
                            this.demands = []
                            this.getAll(this.page)
                            this.topPublishBtnStyle = 'background: A2C6E7;color: snow;'
                        } else if (res.data == '内容违规') {
                             wx.showToast({
                                icon: "none",
                                title: "发布的信息中含有违法违规内容，发布失败",
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
                    this.empty()
            }
        },
        cancelPublish () {
            this.topPublishBtnStyle = 'background: A2C6E7;color: snow;'
            this.showPublishDiv = false
            wx.showToast({
                icon: "none",
                title: "取消发布",
                duration: 2000
            })
            this.empty()
        },
        deleteDemand (item) {
            if (item.publisher_id !== this.$store.state.userInfo.id) {
                wx.showToast({
                    icon: "none",
                    title: "仅该记录的发布者能进行删除操作",
                    duration: 2000
                })
            } else {
                wx.showModal({
                    title: '提示',
                    content: '确定删除该记录吗？',
                    success: res => {
                        if (res.confirm) {
                            this.$fly.delete(`/demand/deleteDemand?id=${item.id}`)
                                .then(res => {
                                    wx.showToast({
                                        icon: "none",
                                        title: "删除成功",
                                        duration: 2000
                                    })
                                    this.page = 1
                                    this.demands = []
                                    this.getAll(this.page)
                                })
                        } else if (res.cancel) {
                            wx.showToast({
                                icon: "none",
                                title: "取消删除",
                                duration: 2000
                            })
                        }
                    },
                })
            }
        },
        queryDetails (item) {
            // 根据publisher_id拿到发布者的头像，传递过去
            this.$fly.get(`/user/getUser?id=${item.publisher_id}`)
                .then(res =>{
                    wx.navigateTo({
                        url:`/pages/demand/details/main?item=${JSON.stringify(item)}&&avatar=${res.data[0].avatar}`
                    })
                })
        }
    }
}
</script>

<style scoped>
.top_btn_div{
    position: relative;
    height: 50px;
    text-align: center;
    margin-bottom: 50px;
}
.top_publish_btn{
    background: #A2C6E7;
    color: snow;
    border: 2px solid lightblue;
    font-family: 'montserrat', sans-serif;
    margin: 10px 10px 0px 10px;
    font-size: 25px;
    font-weight: bolder;
    letter-spacing: 20px;
    text-indent: 30px;
    transition: color 0.4s linear;
    position: fixed;
    width: 95%;
    z-index: 1000;
}
.publish_div{
    width: 95%;
    margin: 0 10px;
}
label{
    line-height: 40px;
    width: 100px;
    text-align: right;
    display: inline-block;
}
.picture_label{
    margin-top: 20px;
}
input{
    border: 1px solid lightgray;
    display: inline-block;
    vertical-align: middle;
    text-indent: 15px;
    border-radius: 6px;
    width: 70%;
}
.choose_picture_btn{
    width: 100px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background-color:#A2C6E7;
    color: white;
    margin: 20px 0 0 60px;
    border-radius: 30px;
    float: right;
}
.img_div{
    display: inline-block;
}
.img {
  width: 100px;
  height: 100px;
  margin: 10px;
}

.homepage-demand {
  width: 98%;
}
.homepage-demand-item {
  display: flex;
  flex: row;
  margin-top: 12px;
  padding: 5px;
  border-radius: 2px;
  box-shadow: 2px 2px 5px #797979;
}
.img-room {
  width: 35%;
}
.info-room {
  width: 62%;
  padding-left: 10px;
}
.demand-item-img {
  width: 90%;
  margin: 10px;
}
.time {
  font-size: 10px;
  color: gray;
}
.detail {
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.publisher {
  font-size: 13px;
}
.price {
  font-size: 15px;
  color: rgb(255, 71, 71);
}
.price-free {
  font-size: 15px;
  color: rgb(58, 190, 58);
  font-weight: bold;
}
.btn_div{
    text-align: center;
    position: absolute;
    top: 93%;
    width: 100%;
    height: 7%;
}
.buttom_cancel_btn,.buttom_publish_btn{
    display: inline-block;
    text-align: center;
    line-height: 2.3;
    width: 50%;
    height: 100%;
    color: #FFF;
    background-color: #A2C6E7;
}
.buttom_cancel_btn{
    left: 0;
}
.buttom_publish_btn{
    left: 50%;
}
.delete_btn{
    width: 14px;
    height: 28px;
    float: right;
    background-image: url('../../../../static/images/delete2.png');
    background-size: contain;
    background-repeat: no-repeat;
}
.delete_btn::after{
    content: '';
    border: none;
}
</style>