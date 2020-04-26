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
const url = "http://localhost:3001/message";
import { formatDatetime } from "@/utils/formatDatetime";
export default {
  data() {
    return {
      friendAva: "",
      name: "",
      msg: {
        id: 0,
        send_id: 12,
        receive_id: 13,
        date: formatDatetime(new Date()),
        content: ""
      },
      chatList: [],
      sendList: [],
      receiveList: []
    };
  },
  computed: {
    sendData() {
      return {
        send_id: 13,
        receive_id: 12
      };
    },
    receiveData() {
      return {
        send_id: 12,
        receive_id: 13
      };
    }
  },
  created() {
    this.msg.send_id = this.$store.state.userInfo.id;
    this.avatar = this.$store.state.userInfo.avatar;
    this.getSend();
    this.$socket.on("connect", function() {
      console.log("connected successfully");
    });
    this.$socket.on("res", function(data) {
      this.chatList = data;
    });
  },
  methods: {
    sendMsg() {
      this.msg.send_id = 12;
      this.msg.date = formatDatetime(new Date());
      this.$socket.emit("req", { id: this.$socket.id, msg: this.msg });
      this.msg.content = "";
    },
    // 第一个执行
    getSend() {
      console.log("getSend");
      // select * from message where send_id=13 AND receive_id=12 limit 0,6
      this.$fly.post(url + "/getChatByFileds", this.sendData).then(res => {
        this.sendList = res.data;
        this.getReceive();
      });
    },
    // 第三个执行
    getReceive() {
      console.log("getReceive");
      this.$fly.post(url + "/getChatByFileds", this.receiveData).then(res => {
        this.receiveList = res.data;
        this.chatList = this.sendList.concat(this.receiveList);
        this.chatList.sort((a, b) => {
          return a.date > b.date ? 1 : -1;
        });
      });
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
