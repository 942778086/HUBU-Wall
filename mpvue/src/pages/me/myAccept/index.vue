<template>
  <div class="myaccept">
    <div class="blank-data" v-if="isBlank">
      <div>--------暂无数据--------</div>
    </div>
    <div class="accept-room" v-else>
      <div class="accept-item" v-for="(item, index) in acceptData" :key="index">
        <i-card :title="item.title" :extra="item.state" :thumb="item.img_url">
          <view slot="content">{{ item.demand_kind }}</view>
          <view slot="footer">{{ item.formatTime }}</view>
        </i-card>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDateFriendly } from "@/utils/formatDatetime";

export default {
  data() {
    return {
      isBlank: true,
      acceptData: []
    };
  },
  onLoad() {
    this.getMyRelease();
  },
  methods: {
    /**
     * 获取我发布的消息
     */
    getMyRelease() {
      this.$fly
        .get("demand/getDemandByDemandKind", {
          accepter_id: this.$store.state.userInfo.id,
          page: 1
        })
        .then(res => {
          let acceptData = this.acceptData;
          let handleData = res.data.map(item => {
            if (!item.details) {
              return;
            }
            let img_url = item.img_url;
            item.title = item.details.substring(0, 5) + "...";
            item.state = item.is_deal === 0 ? "待接取" : "已完成";
            item.formatTime = formatDateFriendly(new Date(item.date));
            item.img_url = (img_url.indexOf(',') > 0) ? img_url.split(',')[0] : img_url;
            return item;
          });
          this.isBlank = handleData.length === 0;
          this.acceptData = handleData;
        });
    }
  }
};
</script>

<style>
.blank-data {
  width: 100%;
  text-align: center;
  margin: 10px auto 0 auto;
  color: gray;
}
</style>