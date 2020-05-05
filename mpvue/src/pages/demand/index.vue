<template>
  <div class="demand">
    <Me></Me>
    <LeadLogin></LeadLogin>
    <div class="advertising">
      <swiper indicator-dots="true" autoplay="true" interval="2000" duration="500">
        <swiper-item>
          <view class="swiper-item">
            余生还长，你别慌<br>
            别回头，别纠缠，别念旧<br>
            ——余华《活着》
          </view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item">
            也许你感觉自己的务力总是徒劳无功<br>
            但不必怀疑你每天都离顶点更近一步<br>
            ——尼采《漂泊者及其影子》
          </view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item">
            你，不要挤<br>
            世界这么大，它容纳的了我，也容纳的了你<br>
            ——狄更斯《你，不要挤》
          </view>
        </swiper-item>
      </swiper>
    </div>
    <div class="demand-kind">
      <div class="demand-kind-item" @click="navDemandKind('闲置物', 'cardLayout')">
        <img class="demand-kind-icon" src="../../../static/images/parcle.png" />
        <p>闲置物</p>
      </div>
      <div class="demand-kind-item" @click="navDemandKind('二手书', 'cardLayout')">
        <img class="demand-kind-icon" src="../../../static/images/shareTheBill.png" />
        <p>二手书</p>
      </div>
      <div class="demand-kind-item" @click="navDemandKind('租房', 'cardLayout')">
        <img class="demand-kind-icon" src="../../../static/images/renting.png" />
        <p>租房</p>
      </div>
    </div>
    <div class="homepage-demand">
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
import Me from "../me/index";
import LeadLogin from "../../components/leadLogin/index";
import { transferStandardToBeijingTime } from "@/utils/formatDatetime";

export default {
  components: { Me, LeadLogin },
  data() {
    return {
      demands: [],
      page: 1,
      pageSize: 6
    }
  },
  created () {
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
    getAll (page) {
      this.$fly.get(`/demand/getDemandByDemandKind?is_deal=${0}&&pageSize=6&&page=${page}`)
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
    queryDetails (item) {
      // 根据publisher_id拿到发布者的头像，传递过去
      this.$fly.get(`/user/getUser?id=${item.publisher_id}`)
        .then(res =>{
          wx.navigateTo({
            url:`/pages/demand/details/main?item=${JSON.stringify(item)}&&avatar=${res.data[0].avatar}`
          })
        })
    },
    navDemandKind(demandKind, isList) {
      wx.navigateTo({
        url: `/pages/demand/${isList}/main?demand_kind=${demandKind}`
      })
    }
  },
  mounted() {}
};
</script>

<style scoped>
.advertising {
  width: 95%;
  height: 145px;
  margin: 53px auto 0 auto;
  border-radius: 15px;
  background-color: rgb(240, 240, 240);
  box-shadow: 2px 2px 5px #797979;
}
.banner-img {
  height: 145px;
}
.swiper-item {
  color: gray;
  font-weight: bold;
  text-align: center;
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  font-size: 18px;
  padding-top: 20px;
}
.demand-kind {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: rgb(241, 241, 241);
  border-radius: 8px;
  width: 98%;
  margin: 10px auto;
  box-shadow: 2px 2px 5px #797979;
}
.demand-kind-item {
  flex: 0 0 25%;
  margin: 10px;
  text-align: center;
  font-size: 12px;
}
.demand-kind-icon {
  width: 24px;
  height: 24px;
}
.homepage-demand {
  width: 98%;
  margin: 0 auto;
  border-top: 0.5px solid gray;
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
</style>
