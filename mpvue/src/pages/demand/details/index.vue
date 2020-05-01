<template>
  <div>
    <div class="page">
      <div class="image">
        <swiper class="swiper" indicator-dots="true" autoplay="true" interval="4000" duration="500">
          <swiper-item v-for="(item, index) in querys.img_url" :key="index" >
            <view class="swiper-item">
              <img :src="item"/>
            </view>
          </swiper-item>
        </swiper>
      </div>

      <div class="details_and_price" :style="detailsAndPriceStyle">
        {{querys.details}}<br>
        <div class="price">
          ¥{{querys.price}}
        </div>
        
      </div>

      <div class="btn_div" :style="btnDivStyle">
        <div @click="contactSeller" class="btn contact">联系卖家</div>
        <div @click="purchase" class="btn purchase">立即购买</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      querys: {},
      avatar: '',
      detailsAndPriceStyle: '',
      btnDivStyle: '',
    }
  },
  created () {
    this.detailsAndPriceStyle = 'width:' + (wx.getSystemInfoSync().windowWidth - 30) + 'px;height:' + (wx.getSystemInfoSync().windowHeight - 330) + 'px;'
    this.btnDivStyle = 'width:' + (wx.getSystemInfoSync().windowWidth) + 'px'
  },
  onLoad: function (options) {
    this.querys = JSON.parse(options.item)
    this.avatar = options.avatar
  },
  methods: {
    purchase (item) {
      
    },
    contactSeller () {
      wx.navigateTo({
        url:`/pages/conversation/dialogue/main?receive_id=${this.querys.publisher_id}&&name=${this.querys.publisher_name}&&avatar=${this.avatar}`
      })
    }
  }
}
</script>

<style scoped>
.page{
  position: absolute;
}
.swiper{
  height: 250px;
}
.image {
  width: 100%;
  height: 250px;
  margin: 0 auto;
  background-color: #A2C6E7;
}
.swiper-item {
  text-align: center;
}
.details_and_price{
  padding: 15px;
  font-size: 16px;
}
.price{
  color: red;
  font-size: 20px;
}
.btn_div{
  position: fixed;
  height: 60px;
  border-top: 1px solid lightgray;
  text-align:center;
}
.btn_div .btn{
  display: inline-block;
  color: white;
  padding: 4px 40px;
  height: 35px;
  line-height: 35px;
  margin: 10px 0;
}
.btn_div .contact{
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background:linear-gradient(#f7b733,#ff9966);
}
.btn_div .purchase{
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  background: linear-gradient(#ff9966,#fc4a1a);
}
.full_screen_image{
  width: 100%;
  position: absolute;
  text-align: center;
}
</style>