<template>
  <div class="demand">
    <i-modal :visible=visible :actions=action @click='handleClick'>
      <view>请点击下方确定按钮进行登录，否则无法正常使用该程序的功能</view>
    </i-modal>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        message: '',
        visible: true,
        action: [
          {
              name: '确定',
              color: '#19be6b',
          }
        ],
        userNewLogin: '',
        userInfo: ''
      }
    },
    methods: {
      handleClick () {
        this.visible = false
        wx.getSetting({
          success: res => {
            console.log('res:',res)
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success: res => {
                  console.log('用户信息：',res)
                  // 把userInfo存到vuex里面
                  this.$store.state.userInfo = res.userInfo
                  this.userInfo = res.userInfo
                  this.addUser()
                }
              })
            }
          }
        })
      },
      testNetwork () {
        this.$fly.get('/')
          .then(res => {
            this.message = res.data
          })
      },
      // 添加user
      addUser () {
        this.$fly.post('/login/newUser',{
          nickName: this.userInfo.nickName,
          avatar:  this.userInfo.avatarUrl,
          wxId: this.$store.state.openId,
          userNewLogin: this.userNewLogin,
          phoneNum: '', // 因为userInfo中没有phoneNum，所以暂时传空
          studentNum: '',
          gender: this.userInfo.gender,
          city: this.userInfo.city,
          province: this.userInfo.province
        })
          .then(res => {
            console.log('增加用户')
            console.log(res)
          })
      },
      // 获取登录时间，并转换成datetime型
      getTime () {
        const date = new Date()
        this.userNewLogin = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      }
    },
    created () {
      this.getTime()
      this.testNetwork()
      this.visible = this.$store.state.loginFlag
    },
    mounted () {
      this.$store.commit("changeNowPart", "demand")
    }
  }
</script>

<style scoped>
</style>
