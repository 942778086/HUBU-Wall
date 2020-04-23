<template>
  <div>
    <Me></Me>

    <div class="topBar">
      <div class="topBar1" :style="allLinkmanStyle" @click="allLinkman">所有联系人</div>
      <div class="topBar1" :style="presentDialogueStyle" @click="presentDialogue">当前会话</div>
    </div>
    <div class="conversation">
      <div @click="dialogue">
        <i-swipeout i-class="i-swipeout-demo-item" :actions="actions">
          <view slot="content">
            <view class="i-swipeout-des">
              <img src="../../../static/images/SpongeBob.jpg"/>
              <view class="i-swipeout-des-h2">第七个小矮人</view>
              <view class="i-swipeout-des-detail">乐观善良的7个小矮人原本过着简单快乐的生活，不料诅咒公主的巫婆利用小矮人进入.</view>
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
        conversations: [
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
    onLoad: function (options) {
      // 在买方的角度才会有publisher_id
      this.publisherId = options.publisher_id
      this.getAvatarByPublisherId()
    },
    methods: {
      // 根据publisherId拿到发布者头像
      getAvatarByPublisherId () {
        this.$fly.get(`/user/getUser?id=${this.publisherId}`)
          .then(res => {
            console.log(res)
          })
      },
      // 进入到聊天界面
      dialogue () {
        wx.navigateTo({
          url: "/pages/conversation/dialogue/main"
        })
      },
      presentDialogue () {
        this.presentDialogueStyle = 'border-bottom: 2px solid lightblue'
        this.allLinkmanStyle = 'border-bottom: 0px solid lightblue'
      },
      allLinkman () {
        this.allLinkmanStyle = 'border-bottom: 2px solid lightblue'
        this.presentDialogueStyle = 'border-bottom: 0px solid lightblue'
      }
    }
  }
</script>

<style scoped>
.topBar{
  margin-top: 55px;
  text-align: center;
  border-bottom: 1px solid lightblue;
  display: flex;
}
.topBar1{
  flex: 1;
  text-align: center;
  display: inline-block;
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
