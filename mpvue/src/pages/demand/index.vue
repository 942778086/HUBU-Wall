<template>
  <div class="demand">
    <Me></Me>
    <LeadLogin></LeadLogin>
    <div class="advertising" :style="advertisingStyle">
    </div>
    <div class="demand">
      <div class="book_box" :style="bookBoxStyle">
        <div class="book" @click="book">二手书</div>
      </div>
      <div class="sublet_and_idle_box">
        <div class="sublet" @click="sublet">转租</div>
        <div class="idle_thing" @click="idleThing">闲置物</div>
      </div>
    </div>
  </div>
</template>

<script>
import Me from "../me/index";
import LeadLogin from "../../components/leadLogin/index"

export default {
  components: { Me, LeadLogin },
  data() {
    return {
      windowWidth: '',
      windowHeight: ''
    }
  },
  created () {
    this.windowWidth = wx.getSystemInfoSync().windowWidth
    this.windowHeight = wx.getSystemInfoSync().windowHeight
    this.advertisingStyle = 'width:' + wx.getSystemInfoSync().windowWidth + 'px'
    this.bookBoxStyle = 'width:' + wx.getSystemInfoSync().windowWidth + 'px'
  },
  methods: {
    book () {
      console.log('book')
      wx.navigateTo({
        url: "/pages/demand/book/main"
      })
    },
    sublet () {
      console.log('sublet')
      wx.navigateTo({
        url: "/pages/demand/sublet/main"
      })
    },
    idleThing () {
      console.log('idleThing')
      wx.navigateTo({
        url: "/pages/demand/idleThing/main"
      })
    }
  },
  mounted() {
    
  }
};
</script>

<style scoped>
.advertising{
  height: 180px;
  background-color: pink;
}
.demand{
  position: relative;
}
.demand .book_box,.sublet_and_idle_box{
  position: relative;
  height: 150px;
  background-color: red;
}
.demand .book_box .book{
  width: 150px;
  height: 150px;
  border-radius: 100%;
  margin: auto;
  background-color: lightgreen;
}
.demand .sublet_and_idle_box .sublet{
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  left: 37px;
  top: -20px;
  background-color: lightskyblue;
}
.demand .sublet_and_idle_box .idle_thing{
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  left: 187px;
  top: -20px;
  background-color: mediumslateblue;
}
</style>
