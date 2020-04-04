<template>
  <div class="drawer-whole">
    <div class="drawer-content">
      <div class="ava-room">
        <image class="info-ava" v-if="waitRender" :src="avatorURL" />
        <p class="info-name">{{ username }}</p>
      </div>
      <div class="drawer-divider"></div>
      <div class="info-menu">
        <i-cell-group>
          <i-cell title="我的信息" @click="nav('myInfo')" is-link></i-cell>
          <i-cell title="我发布的需求" @click="nav('myRelease')" is-link></i-cell>
          <i-cell title="我接取的需求" @click="nav('myAccept')" is-link></i-cell>
          <i-cell title="联系开发者" @click="nav('contactDev')" is-link></i-cell>
          <i-cell title="关于我们" @click="nav('aboutUs')" is-link></i-cell>
        </i-cell-group>
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
      avatorURL: "",
    };
  },
  computed: {
    "username"() {
      return this.$store.state.userInfo.nick_name
    }
  },
  methods: {
    nav(route) {
      wx.navigateTo({
        url: `/pages/me/${route}/main`
      });
    },
    closeDrawer() {
      this.$emit("closeDrawer");
    }
  },
  created() {
    this.avatorURL = this.$store.state.userInfo.avatar
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
.ava-room {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.info-ava {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid rgb(12, 108, 172);
  margin: 10px auto 0 auto;
}
.info-name {
  margin: 10px auto 0 auto;
  padding: 0 5px 0 5px;
  color: white;
  border: 1px 1px 0 1px;
  border-block-color: white;
  
  background-color: rgb(12, 108, 172);
}
.drawer-divider {
  width: 100%;
  height: 1px;
  background-color: rgb(83, 83, 83);
}
.info-list {
  padding: 10px;
}
</style>
<style>
.drawer-whole .i-card-header-thumb {
  border-radius: 50%;
}
</style>