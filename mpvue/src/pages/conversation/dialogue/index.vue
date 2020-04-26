<template>
  <div class="chatPage">
    <div class="header">{{ name }}</div>
    <div class="body">
      <div class="chatRoom" v-for="(item, index) in chatList" :key="index">
        <div class="avaRoom">
          <img class="friendAva" alt :src="friendAva" v-if="item.send_id === msg.receive_id" />
        </div>
        <div class="chatBody">{{ item.content }}</div>
        <div class="avaRoom">
          <img class="myAva" :src="avatar" v-if="item.send_id === msg.send_id" />
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
      friendAva: "",
      name: "",
      msg: {
        id: 0,
        send_id: 0,
        receive_id: 0,
        date: formatDatetime(new Date()),
        content: ""
      },
      chatList: []
    };
  },
  onLoad: function (options) {
    console.log('options:',options)
    this.querys = options
    this.name = options.name
  },
  created () {
    // console.log('this.$store.state.userInfo.id2:',this.$store.state.userInfo.id)
    // this.msg.send_id = this.$store.state.userInfo.id;
    // this.avatar = this.$store.state.userInfo.avatar;
    this.$socket.on("connect", function() {
        console.log("connected successfully");
    });
    this.$socket.on("res", function(data) {
        console.log('socketRes:',data)
        this.chatList = data;
    });
  },
  methods: {
    getAllMessage () {
      this.$fly.post(`/message/getAll?send_id=${this.$store.state.userInfo.id}&&receive_id=${this.querys.receive_id}`)
        .then(res =>{
          console.log('messageRes:',res)
          this.chatList = res.data.data
        })
    },
    // 发送消息
    sendMsg() {
      console.log('this.querys.receive_id:',this.querys.receive_id)
      console.log('this.$store.state.userInfo.id:',this.$store.state.userInfo.id)
      this.msg.send_id = this.$store.state.userInfo.id
      this.msg.receive_id = parseInt(this.querys.receive_id);
      this.msg.date = formatDatetime(new Date());
      this.$socket.emit("req", { id: this.$socket.id, msg: this.msg });
      this.msg.content = "";
      this.getAllMessage()
    }
  }
};
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
.body {
  width: 100%;
  height: 471px;
}
.foot {
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
  margin-left: 8px;
  border-radius: 50%;
  border: 1px solid #4c667c;
}
.chatBody {
  width: 217px;
  padding-top: 15px;
}
</style>
