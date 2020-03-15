<template>
  <div class="drawer-whole">
    <div class="drawer-content">
      <div class="avaRoom">
        <img class="info-ava" v-if="waitRender" :src="avatorURL" />
      </div>
      <div class="drawer-divider"></div>
      <div class="info-menu">
        <div class="info-list myinfo" @click="nav('myInfo')">我的信息</div>
        <div class="info-list myrelease" @click="nav('myRelease')">我发布的需求</div>
        <div class="info-list myaccept" @click="nav('myAccept')">我接取的需求</div>
        <div class="info-list contactdev" @click="nav('contactDev')">联系开发者</div>
        <div class="info-list aboutus" @click="nav('aboutUs')">关于我们</div>
      </div>
    </div>
    <div class="drawer-maskerlayer" @click="closeDrawer"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      waitRender: true,
    }
  },
  props: ['avatorURL'],
  methods: {
    nav(route) {
      wx.navigateTo({
        url: `/pages/me/${route}/main`
      });
    },
    closeDrawer() {
      this.$emit("closeDrawer");
    }
  }
};
</script>

<style scoped>
.drawer-whole {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  transition: all 1s;
}
.drawer-content {
  height: 100%;
  width: 75%;
  background-color: #f8f4ed;
}
.drawer-maskerlayer {
  width: 25%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.637);
}
.avaRoom {
  display: flex;
  justify-content: center;
}
.info-ava {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid rgb(12, 108, 172);
  margin: 10px auto 0 auto;
}
.drawer-divider {
  width: 100%;
  height: 1px;
  margin: 10px 0 10px 0;
  background-color: rgb(83, 83, 83);
}
.info-list {
  padding: 10px;
}
</style>