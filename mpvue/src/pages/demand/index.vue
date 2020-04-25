<template>
  <div class="demand">
    <Me></Me>
    <LeadLogin></LeadLogin>
    <div class="advertising">
      <swiper indicator-dots="true" autoplay="true" interval="2000" duration="500">
        <swiper-item>
          <view class="swiper-item">
            <img class="banner-img" mode="heightFix" src="../../../static/images/header.png" />
          </view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item">广告位招租</view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item">广告位招租</view>
        </swiper-item>
      </swiper>
    </div>
    <div class="demand-kind">
      <div class="demand-kind-item">
        <img class="demand-kind-icon" src="../../../static/images/parcle.png" />
        <p>代拿快递</p>
      </div>
      <div class="demand-kind-item">
        <img class="demand-kind-icon" src="../../../static/images/shareTheBill.png" />
        <p>二手书</p>
      </div>
      <div class="demand-kind-item">
        <img class="demand-kind-icon" src="../../../static/images/resource.png" />
        <p>资源求助</p>
      </div>
      <div class="demand-kind-item">
        <img class="demand-kind-icon" src="../../../static/images/technology.png" />
        <p>技术求助</p>
      </div>
      <br />
      <div class="demand-kind-item">
        <img class="demand-kind-icon" src="../../../static/images/partTimeJob.png" />
        <p>兼职资源</p>
      </div>
    </div>
    <div class="homepage-demand">
      <div class="homepage-demand-item" v-for="(item, index) in homepageList" :key="index">
        <div class="img-room">
          <img :src="item.img_url" mode="widthFix" class="demand-item-img" />
        </div>
        <div class="info-room">
          <p class="detail">{{ item.details }}</p>
          <div class="publisher">来自{{ item.publisher_name }}</div>
          <div v-if="item.price == 0" class="price-free">FREE</div>
          <div v-else class="price">￥{{ item.price }}</div>
          <div class="time">{{ item.date }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Me from "../me/index";
import LeadLogin from "../../components/leadLogin/index";
import { formatDateFriendly } from "../../utils/formatDatetime";

export default {
  components: { Me, LeadLogin },
  data() {
    return {
      homepageList: [
        {
          img_url:
            "https://wjxcloud-1258315462.cos.ap-guangzhou.myqcloud.com/wx9122a6cd0208fd3f.o6zAJszYgZqTqQaMLlu5mEiTpX08.EifU26R0OlDB00e4f6786d5b14dc640e6ac5e790cc36.jpg",
          date: formatDateFriendly(new Date()),
          publisher_name: "wujianx",
          publisher_id: "20",
          price: "4",
          details: "帮我带早饭，要三期后面的那个啥卖的那个叫啥啥啥的面包"
        },
        {
          img_url:
            "https://wjxcloud-1258315462.cos.ap-guangzhou.myqcloud.com/wx9122a6cd0208fd3f.o6zAJszYgZqTqQaMLlu5mEiTpX08.XxVNg9OtBFti61576a7a85f07b37ff5ef39de7201852.jpg",
          date: formatDateFriendly(new Date()),
          publisher_name: "wujianx",
          publisher_id: "20",
          price: "",
          details: "有没有人知道这个画的出处啊"
        }
      ]
    };
  },
  created() {},
  methods: {
    navDemandKind(demandKind, isList) {
      wx.navigateTo({
        url: `/pages/demand/${
          isList ? "listLayout" : "cardLayout"
        }/main?demandKind=${demandKind}`
      });
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
  text-align: center;
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
