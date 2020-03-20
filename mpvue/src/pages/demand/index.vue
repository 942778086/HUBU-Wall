<template>
  <div class="demand">
    <i-modal :visible=visible :actions=action @click='handleClick'>
      <view>请点击下方确定按钮进行登录，否则无法正常使用该程序的功能</view>
    </i-modal>
    <Badge :count="100">
        <a href="#" class="demo-badge"></a>
    </Badge>
    <Badge :count="1000" overflow-count="999">
        <a href="#" class="demo-badge"></a>
    </Badge>
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
        userNewLogin: ''
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
                  console.log(res.userInfo)
                  // 把userInfo存到vuex里面
                  this.$store.state.userInfo = res.userInfo
                  // 把userInfo和openId存到数据库
                  this.$fly.post('/login/newUser',{
                    nickName: res.userInfo.nickName,
                    avatar:  res.userInfo.avatarUrl,
                    wxId: this.$store.state.openId,
                    userNewLogin: this.userNewLogin,
                    phoneNum: '', // 因为userInfo中没有phoneNum，所以暂时传空
                    studentNum: '',
                    gender: res.userInfo.gender,
                    city: res.userInfo.city,
                    province: res.userInfo.province
                  })
                    .then(res => {
                      console.log('增加用户')
                      console.log(res)
                    })
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
      // 获取登录时间，并转换成datetime型
      getTime () {
        const date = new Date()
        this.userNewLogin = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      }
    },
    created () {
      this.getTime()
      this.testNetwork()
      console.log(this.$store.state.loginFlag)
      this.visible = this.$store.state.loginFlag
    },
    mounted () {
      this.$store.commit("changeNowPart", "demand")
    }
  }
</script>

<style scoped>
</style>
