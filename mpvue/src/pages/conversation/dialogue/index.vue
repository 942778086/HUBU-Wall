<template>
  <div class="chatPage">
    <scroll-view :style="bodyStyle" scroll-y :scroll-into-view="toLast">
      <div class="chatRoom" v-for="(item, index) in chatList" :key="index" :id="'item'+(index+1)">
        <div class="avaRoom">
          <img class="friendAva" alt :src="friendAva" v-if="item.send_id !== user_id">
        </div>

        <div :style="item.send_id === user_id ? rightChatBodyStyle : leftChatBodyStyle">{{ item.content }}</div>

        <div class="avaRoom">
          <img class="myAva" :src="avatar"  v-if="item.send_id === user_id"/>
        </div>

        <div class="time" v-if="index%6==0">{{ item.date }}</div>
      </div>
    </scroll-view>

    <div class="foot">
      <input v-model="msg.content" type="text" placeholder="请输入消息" maxlength="100" />
      <button class="send_btn" type="default" ghost @click="sendMsg">发送</button>
    </div>
  </div>
</template>

<script>
import { formatDatetime, transferStandardToBeijingTime } from "@/utils/formatDatetime";
export default {
  data() {
    return {
      avatar: "",
      friendAva: "",
      name: "",
      user_id: 0,
      msg: {
        id: 0,
        send_id: 0,
        receive_id: 0,
        date: formatDatetime(new Date()),
        content: ""
      },
      chatList: [],
      toLast: '',
      bodyStyle: 'width: 100%;height:' + ( wx.getSystemInfoSync().windowHeight - 50 ) + 'px;overflow:scroll',
      rightChatBodyStyle: 'width:' + ( wx.getSystemInfoSync().windowWidth - 135 ) + 'px;text-align: right;margin: 0 10px;padding-top: 15px;',
      leftChatBodyStyle: 'width:' + ( wx.getSystemInfoSync().windowWidth - 125 ) + 'px;text-align: left;margin: 0 10px;padding-top: 15px;'
    };
  },
  created () {
    this.$socket.on("connect", function () {
      console.log("connected successfully")  
    })
    // 写在这里语意不清晰，让人难以理解
    // this.$socket.on("res", (data) => {
    //   this.chatList = data.data
    //   this.toLast = `item${this.chatList.length}`
    //   wx.setTabBarBadge({
    //     index: 1,
    //     text: '1'
    //   })
    // })
  },
  onLoad (options) {
    this.querys = options
    this.name = options.name
    this.setNavigationBarTitleText()
    this.getAllMessage()
    this.friendAva = options.avatar
    this.avatar = this.$store.state.userInfo.avatar
    this.user_id = this.$store.state.userInfo.id
  },
  onUnload () {
    // 这个函数有问题！！！！
    console.log('chatList:',this.chatList)
    // 怎么判断是新增还是更新呢？后台有做判断
    this.$fly.post('/message/newDialogueInfo', {
      avatar: this.querys.avatar,
      name: this.querys.name,
      last_sentence: this.chatList[this.chatList.length-1].content,
      receive_id: this.querys.receive_id,
      send_id: this.$store.state.userInfo.id
    })
      .then(res => {
        console.log('res:',res)
        this.$socket.emit('dialogueInfo',{id: this.$socket.id, page: 1, pageSize: 10, receive_id: this.querys.receive_id, send_id: this.$store.state.userInfo.id})
      })
  },
  methods: {
    // 设置navigationBarTitleText
    setNavigationBarTitleText () {
      wx.setNavigationBarTitle({
        title: this.name
      })
    },
    getAllMessage () {
      this.$fly.post(`/message/getAll?send_id=${this.$store.state.userInfo.id}&&receive_id=${this.querys.receive_id}`)
        .then(res =>{
          console.log('res:',res)
          this.chatList = res.data.data
          this.chatList.forEach(element => {
            element.date = transferStandardToBeijingTime(element.date)
          })
          this.toLast = `item${this.chatList.length}`
        })
    },
    // 发送消息
    sendMsg() {
      if (this.msg.content) {
        this.msg.send_id = this.$store.state.userInfo.id
        this.msg.receive_id = parseInt(this.querys.receive_id)
        this.msg.date = formatDatetime(new Date())
        this.$socket.emit("req", { id: this.$socket.id, msg: this.msg })
        this.msg.content = ""
        this.$socket.on("res", (data) => {
          this.chatList = data.data
        })
      }
    }
  }
}
</script>

<style scoped>
.chatPage {
  position: absolute;
  min-width: 100%;
  height: 100%;
  background-color: #ebebeb;
}
.foot {
  position: absolute;
  width: 100%;
  height: 12%;
  top: 88%;
  background-color: lightgray;
}
input{
  height: 40%;
  text-indent: 10px;
}
.send_btn{
  height: 60%;
  background: #A2C6E7;
  color: white;
  font-weight: bold;
  font-size: 20px;
  line-height: 2.2;
  letter-spacing: 15px;
}
button{
  padding: 0 0 0 15px;
}
.chatRoom {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 25px auto 8px auto;
}
.avaRoom {
  width: 50px;
  height: 50px;
}
.myAva {
  width: 50px;
  margin-right: 8px;
  border-radius: 50%;
  border: 1px solid #4c667c;
}
image {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 1px solid #4c667c;
}
.friendAva {
  width: 50px;
  border-radius: 50%;
  border: 1px solid #4c667c;
}
.time{
  position: absolute;
  font-size: 14px;
  height: 10px;
  line-height: 10px;
  width: 100%;
  text-align: center;
}
</style>
