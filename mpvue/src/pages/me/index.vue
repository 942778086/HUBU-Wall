<template>
  <div class="whole">
    <div class="me">
      <div class="avator" @click="showInfoList">
        <img class="avator" :src="avatorURL" />
      </div>
    </div>
    <drawer :avatorURL="avatorURL" v-if="drawerVsible" @closeDrawer="closeDrawer"></drawer>
  </div>
</template>

<script>
import drawer from "../../components/drawer/drawer";

export default {
  data() {
    return {
      drawerVsible: false,
      avatorURL:
        "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIIWgISmZ2564fN6LjT9H11buh7CRc6A8YgOdL8ftZ00cqGjcj4ksd2ZEQURzmwy6dPgogKlSbRSw/132",
    };
  },
  components: { drawer },
  methods: {
    showInfoList() {
      this.drawerVsible = true;
    },
    closeDrawer() {
      console.log(11)
      this.drawerVsible = false;
    },
    menuRoute(event) {
      console.log(event)
    }
  }
};
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
</style>
