<template>
  <div class="demand">
    <i-modal :visible=isShowLoginTooltip :actions=action @click='getUserInfoAndLogin'>
      <view>请点击下方确定按钮进行登录，否则无法正常使用该程序的功能</view>
    </i-modal>
  </div>
</template>

<script>
  import { formatDatetime } from '../../utils/formatDatetime'
  export default {
    data () {
      return {
        isShowLoginTooltip: true,
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
      getUserInfoAndLogin () {
        this.isShowLoginTooltip = false
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success: res => {
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
      // 添加user
      addUser () {
        const userInfo = this.userInfo
        this.$fly.post('/login/newUser',{
          nickName: userInfo.nickName,
          avatar:  userInfo.avatarUrl,
          wxId: this.$store.state.openId,
          userNewLogin: this.userNewLogin,
          phoneNum: '', // 因为userInfo中没有phoneNum，所以暂时传空
          studentNum: '',
          gender: userInfo.gender,
          city: userInfo.city,
          province: userInfo.province
        })
          .then(res => {
            if (res.data.message === '添加用户成功') {
              wx.showToast({
                icon: 'none',
                title: '登录成功',
                duration: 2000
              })
            } 
          })
      },
      // 获取登录时间，并转换成datetime型
      getTime () {
        const date = new Date()
        this.userNewLogin = formatDatetime(date)
      }
    },
    created () {
      this.getTime()
      this.isShowLoginTooltip = this.$store.state.loginFlag
    },
    mounted () {
      this.$store.commit("changeNowPart", "demand")
    }
};
</script>

<style scoped>
</style>
