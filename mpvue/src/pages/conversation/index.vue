<template>
  <div>
    <Me></Me>
    <div class="conversation">
      <div @click="dialogue(item, index)" v-for="(item, index) in dialogueList" :key="index">
        <i-swipeout i-class="i-swipeout-demo-item">
          <view slot="content">
            <view class="i-swipeout-des">
              <img :src="item.avatar"/>
              <view class="i-swipeout-des-h2">{{ item.name }}</view>
              <view class="i-swipeout-des-detail">{{ item.last_sentence }}</view>
              <button @click.stop="handleDelete(item)"></button>
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
          }
        ],
        page: 1,
        pageSize: 10,
        dialogueIndex: 0
      }
    },
    created () {
      this.$socket.on("dialogueInfoRes", (data) => {
        this.dialogueList[this.dialogueIndex] = data.data[0]
        this.$forceUpdate()
      })
    },
    onLoad: function () {
      this.getAll()
    },
    methods: {
      // 获取所有对话记录
      getAll () {
        this.$fly.post(`/message/getAllDialogueInfo?page=${this.page}&&pageSize=${this.pageSize}&&send_id=${this.$store.state.userInfo.id}`)
          .then(res => {
            this.dialogueList = res.data
          })
      },
      // 删除某条对话记录
      handleDelete (item) {
        wx.showModal({
          title: '提示',
          content: '确定删除该对话吗？',
          success: res => {
            if (res.confirm) {
              this.$fly.post(`/message/deleteDialogueInfo?id=${item.id}`)
                .then(res => {
                  wx.showToast({
                    icon: "none",
                    title: "删除成功",
                    duration: 2000
                  })
                  this.getAll()
                })
            } else if (res.cancel) {
              wx.showToast({
                icon: "none",
                title: "取消删除",
                duration: 2000
              })
            }
          }
        })
      },
      // 进入到聊天界面
      dialogue (item, index) {
        this.dialogueIndex = index
        wx.navigateTo({
          url:`/pages/conversation/dialogue/main?receive_id=${item.receive_id}&&name=${item.name}&&avatar=${item.avatar}`
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
  width: 45px;
  height: 45px;
  position: absolute;
  left: 0px;
  margin-right: 10px;
  border-radius: 100%;
}
button{
  float: right;
  padding: 0;
  width: 30px;
  height: 30px;
  background-image: url('../../../static/images/close.png');
  background-size: contain;
  background-color: none;
  outline: none;
  border: none;
  border-radius: 0;
  top: -10px;
  left: -10px;

}
button::after{
  border: none;
}
</style>
<style>
.i-swipeout-des-h2{
  position: relative;
  left: 55px
}
.i-swipeout-des-detail{
  position: relative;
  left: 55px;
  display: inline-block;
}
</style>
