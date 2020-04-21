<template>
  <div class="whole">
    <div class="me">
      <div class="avator" @click="showInfoList">
        <image class="avator" v-if="waitData" :src="avatorUrl" />
      </div>
    </div>
    <drawer v-if="drawerVsible" @closeDrawer="closeDrawer"></drawer>
  </div>
</template>

<script>
import drawer from "../../components/drawer/drawer";

export default {
  data() {
    return {
      drawerVsible: false,
      timer: null,
      waitData: false,
      avatorUrl: ""
    };
  },
  components: { drawer },
  methods: {
    showInfoList() {
      this.drawerVsible = true;
    },
    closeDrawer() {
      this.drawerVsible = false;
    },
    /**
     * 处理小程序图片
     * 注意：小程序中图片使用image标签，而非img标签
     *      使用v-if，延迟图片加载，以防尚未获取url，就已经构建了image
     */
    getAva() {
      this.timer = setInterval(() => {
        if (!this.avatorUrl) {
          if (this.$store.state.userInfo.avatar) {
            this.avatorUrl = this.$store.state.userInfo.avatar;
            this.waitData = true;
          }
        } else {
          this.timer = null;
        }
      }, 500);
    }
  },
  created() {
    this.getAva();
  }
};
</script>

<style scoped>
.me {
  position: fixed;
  display: flex;
  top: 0;
  width: 100%;
  height: 50px;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid gray;
  background-color: rgb(241, 241, 241);
  z-index: 999;
}
.avator {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgb(46, 138, 33);
}
.container {
  width: 260px;
  height: 1000px;
  padding: 10px;
}
</style>
