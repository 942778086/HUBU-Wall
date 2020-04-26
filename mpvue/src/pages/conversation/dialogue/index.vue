<template>
  <div class="chatPage">
    <div class="header">{{ name }}</div>
              
    <div class="body" :style="bodyStyle">
      <div class="chatRoom" v-for="(item, index) in chatList" :key="index">

        <div class="avaRoom">
          <img class="friendAva" alt :src="friendAva" v-if="item.send_id !== user_id">
        </div>

        <div :style="item.send_id === user_id ? rightChatBodyStyle : leftChatBodyStyle">{{ item.content }}</div>

        <div class="avaRoom">
          <img class="myAva" :src="avatar"  v-if="item.send_id === user_id"/>
        </div>
      </div>
    </div>

    <div class="foot">
      <input v-model="msg.content" type="text" placeholder="请输入消息" maxlength="100" />
      <Button type="default" ghost @click="sendMsg">发送</Button>
    </div>
  </div>
</template>

<script>
import { formatDatetime } from "@/utils/formatDatetime";
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
      bodyStyle: 'width: 100%;height:' + ( wx.getSystemInfoSync().windowHeight - 60 ) + 'px;overflow:hidden',
      rightChatBodyStyle: 'width:' + ( wx.getSystemInfoSync().windowWidth - 125 ) + 'px;text-align: right;margin: 0 10px;padding-top: 15px;',
      leftChatBodyStyle: 'width:' + ( wx.getSystemInfoSync().windowWidth - 125 ) + 'px;text-align: left;margin: 0 10px;padding-top: 15px;'
    };
  },
  created () {
    this.$socket.on("connect", function () {
        console.log("connected successfully")
    })
    this.$socket.on("res", function (data) {
        this.chatList = data
    })
  },
  onLoad: function (options) {
    this.querys = options
    this.name = options.name
    this.getAllMessage()
    this.friendAva = options.avatar
    this.avatar = this.$store.state.userInfo.avatar
    this.user_id = this.$store.state.userInfo.id
  },
  methods: {
    getAllMessage () {
      this.$fly.post(`/message/getAll?send_id = ${this.$store.state.userInfo.id}&&receive_id = ${this.querys.receive_id}`)
        .then(res =>{
          this.chatList = res.data.data
        })
    },
    // 发送消息
    sendMsg() {
      this.msg.send_id = this.$store.state.userInfo.id
      this.msg.receive_id = parseInt(this.querys.receive_id)
      this.msg.date = formatDatetime(new Date())
      this.$socket.emit("req", { id: this.$socket.id, msg: this.msg })
      this.msg.content = ""
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
.header {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  background-color: #4c667c;
  color: white;
}
.foot {
  position: fixed;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #4c667c;
}
.chatRoom {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 0 auto 8px auto;
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
</style>
