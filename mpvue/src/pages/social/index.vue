<template>
  <div class="social">
    <div>
      <i-panel v-for="(item,index) in dynamics" :key="index" hide-border="true">

        <i-card :title="item.user[0].nick_name" :thumb="item.user[0].avatar">
          <view slot="content">{{item.dynamic.article}}</view>
          <view slot="footer">浏览数：{{item.dynamic.view_count}}-点赞数：{{item.dynamic.like_count}}</view>
        </i-card>

      </i-panel>
    </div>
    <div>
      <i-button @click="go_publish" type="success" shape="circle" size="small">我也要发布动态</i-button>
    </div>
  </div>
</template>

<script>
import Me from "../me/index";
import { post, get } from "@/utils";

export default {
  data() {
    return {
      src: ["/static/images/others.png", "/static/images/others.png"],
      dynamics: []
    };
  },
  components: { Me },
  mounted() {
    this.$store.commit("changeNowPart", "social");
  },
  onShow: function (options) {
    this.get_dynamic();
  },
  methods: {
    go_publish() {
      wx.navigateTo({
        url: "/pages/publish/main"
      });
    },
    async get_dynamic() {
      let that = this;
      const data = {
        page: 0
      };
      try {
        // await：等后端执行完毕之后再开始执行
        const res = await post("/dynamic/getAll", data);
        console.log(res);
        that.dynamics = res;
        showModal("执行成功", "您的动态已发布");
      } catch (e) {
        showModal("提交失败", "服务器冒烟了，请稍后重试");
      }
    }
  }
};
</script>

<style scoped>
</style>
