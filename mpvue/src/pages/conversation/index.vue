<template>
  <div>
    <Me></Me>
    <div class="conversation">
      <div @click="dialogue" v-for="(item, index) in dialogueList" :key="index">
        <i-swipeout i-class="i-swipeout-demo-item" :actions="actions">
          <view slot="content">
            <view class="i-swipeout-des">
              <img :src="item.avatar"/>
              <view class="i-swipeout-des-h2">{{ item.name }}</view>
              <view class="i-swipeout-des-detail">{{ item.lastSentence }}</view>
            </view>
          </view>
        </i-swipeout>
      </div>
    </div>
  </div>
</template>

<script>
import Me from "../me/index";
  export default {
    components: { Me },
    data () {
      return {
        publisherId: '',
        presentDialogueStyle: '',
        allLinkmanStyle: 'border-bottom: 2px solid lightblue',
        dialogueList: [
        ],
        actions : [
          {
            name : '删除',
            color : '#fff',
            fontsize : '20',
            width : 90,
            background : '#ed3f14'
          },
          {
            name : '取消',
            width : 90,
            color : '#80848f',
            fontsize : '20',
            icon : 'undo'
          }
        ]
      }
    },
    created () {
    }, 
    onShow: function () {
      this.dialogueList = this.$store.state.dialogueInfo
    },
    methods: {
      // 进入到聊天界面
      dialogue () {
        wx.navigateTo({
          url: "/pages/conversation/dialogue/main"
        })
      }
    }
  }
</script>

<style scoped>
.conversation {
  margin-top: 55px;
  height: 40px;
}
img{
  width: 40px;
  height: 40px;
  position: absolute;
  left: 0px;
  border-radius: 100%;
}
</style>
<style>
.i-swipeout-des-h2{
  position: relative;
  left: 40px
}
.i-swipeout-des-detail{
  position: relative;
  left: 40px
}
</style>
