<template>
  <div class="whole">
    <div class="me">
    <div class="avator" @click="showInfoList">
      <img class="avator" :src="avatorURL">
    </div>
    </div>
    <i-drawer mode="left" :visible="showDrawer" @close="closeDrawer">
      <view class="container">
        <div>
          <img class="ava-in-info" :src="avatorURL">
        </div>
      </view>
  </i-drawer>
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        showDrawer: false,
        avatorURL: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIIWgISmZ2564fN6LjT9H11buh7CRc6A8YgOdL8ftZ00cqGjcj4ksd2ZEQURzmwy6dPgogKlSbRSw/132"
      }
    },
    methods: {
      showInfoList() {
        this.showDrawer = true
      },
      closeDrawer() {
        this.showDrawer = false
      }
    }
  }
</script>

<style scoped>
.me {
  display: flex;
  top: 0;
  width: 100%;
  height: 50px;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid gray;
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
  background-color: rgb(226, 226, 226);
}
.ava-in-info {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid rgb(12, 108, 172);
}
</style>
