<template>
  <div class="social">
    <Me></Me>
    <div>
      <i-panel v-for="(item,index) in dynamics" :key="index" hide-border="true">
        <i-card :title="item.username" :thumb="item.user_ava">
          <view slot="content">{{item.article}}</view>
          <view slot="footer">浏览数：{{item.view_count}} | 点赞数：{{item.like_count}}</view>
        </i-card>
      </i-panel>
    </div>
    <div>
      <i-button @click="goPublish" type="success" shape="circle" size="small">我也要发布动态</i-button>
    </div>
  </div>
</template>

<script>
import Me from "../me/index";

export default {
  data() {
    return {
      src: ["/static/images/others.png", "/static/images/others.png"],
      dynamics: []
    };
  },
  components: { Me },
  onShow() {
    this.getDynamic();
  },
  methods: {
    goPublish() {
      wx.navigateTo({
        url: "/pages/social/publish/main"
      });
    },
    getDynamic() {
      this.$fly
        .get("/dynamic/getAll?page=1")
        .then(res => {
          this.dynamics = res.data.data;
        })
        .catch(err => {
          console.log(err)
        });
    }
  }
};
</script>

<style scoped>
</style>
