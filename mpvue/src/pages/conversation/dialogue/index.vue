<template>
    <div>
        <div class="dialog_box" :style="dialogBoxStyle">            
            <div v-for="(item, index) in messages" :key="index">
                <div class="dialogue" :style="dialogueStyle">
                    <img :style="(item.user_id === id) ? img_right : img_left" src="../../../../static/images/SpongeBob.jpg" alt="">
                    <div :style="(item.user_id === id) ? dialog_box_right : dialog_box_left">{{ item.content }}</div>
                </div>
            </div>
        </div>

        <div class="send_box" :style="sendBoxStyle">
            <input v-model="content" type="text" placeholder="请输入消息" maxlength="100"/>
            <i-button @click="sendMessage" type="success" shape="circle" size="small">发送</i-button>
        </div>

        <div class="additional_function"></div>
    </div>
</template>

<script>
import { formatDatetime } from '@/utils/formatDatetime'
export default {
    data () {
        return {
            messages: [],
            content: '',
            dialogBoxStyle: '',
            dialogueStyle: '',
            publisherId: 0,
            talk_to_id: 0,
            id: '',
            img_right: 'float: right;',
            img_left: 'position: absolute;left: 0vw;',
            dialog_box_right: 'position: relative;float: right;',
            dialog_box_left: 'position: relative;left: 12vw'
        }
    },
    onLoad: function (options) {
        // 在买方的角度才会有publisher_id
        this.publisherId = options.publisher_id
        this.getAll()
        this.id = this.$store.state.userInfo.user_id
    },
    mounted () {
    },
    created () {
        this.dialogueStyle = 'width:' + wx.getSystemInfoSync().windowWidth + 'px;height:40px' 
        this.dialogBoxStyle = 'width:' + wx.getSystemInfoSync().windowWidth + 'px;height:' + (wx.getSystemInfoSync().windowHeight - 40) + 'px' 
        this.sendBoxstyle = 'width:' + wx.getSystemInfoSync().windowWidth + 'px;'
    },
    methods: {
        // 发送消息
        sendMessage () {
            this.$fly.post('/message/newMessage', {
                date: formatDatetime(new Date()),
                content: this.content,
                // 在买方的角度
                user_id: this.$store.state.userInfo.user_id,
                talk_to_id: (this.publisherId!==undefined) ? this.publisherId : this.talk_to_id,
                // 在卖方的角度talk_to_id是第一条message的userid，拿到之后存起来
            }).then(res =>{
                this.content = ''
                this.getAll()
            })
        },
        // 查询消息
        getAll () {
            // 在买方的角度查询消息的时候
            this.$fly.post(`/message/getAll?user_id=${this.$store.state.userInfo.user_id}&&talk_to_id=${this.publisherId}`)
                .then(res => {
                    this.messages = res.data.data
                    this.talk_to_id = res.data.data[res.data.data.length-1].user_id
                })
        }
    }
}
</script>

<style scoped>
.dialog_box{
    background-color: lightgray;
}
.dialogue{
    position: relative;
}
img{
  width: 9vw;
  height: 9vw;
  border-radius: 100%;
}
.send_box{
    position: relative;
}
.send_btn{
    float: right;
    margin-top: -48.25px;
    width: 80px;
}
.additional_function{
    height: 20px;
}
input{
    margin: 10px 15px 0 15px;
}
</style>