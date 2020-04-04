<template>
  <div>
    <i-modal :visible="isShowLoginTooltip" :actions="action" @click="getUserInfo">
      <view>允许登录授权吗？</view>
    </i-modal>
  </div>
</template>
<script>
import { formatDatetime } from "./utils/formatDatetime";

export default {
  data() {
    return {
      isShowLoginTooltip: true,
      action: [
        {
          name: "确定",
          color: "#19be6b"
        }
      ],
      userNewLogin: "",
      userInfo: ""
    };
  },
  methods: {
    /**
     * 登录方法
     * 逻辑：用code从服务端获取信息
     * 如果获取到的是openId，则执行新增用户逻辑
     * 如果获取到的是用户信息，则结束流程
     */
    login() {
      wx.login({
        success: res => {
          if (res.code) {
            this.$fly.get("http://localhost:3001/login/getOpenId", {
                code: res.code
              }).then(res => {
                if (typeof res.data === "string") {
                  this.getUserInfo().then(userInfo => {
                    this.addUser(userInfo, res.data);
                  });
                } else {
                  this.$store.state.userInfo = res.data;
                  console.log(res.data)
                  wx.showToast({
                    icon: "none",
                    title: "登录成功",
                    duration: 2000
                  });
                }
              });
          } else {
            wx.showToast({
              icon: "none",
              title: "登录失败" + res.errMsg,
              duration: 2000
            });
          }
        }
      });
    },
    /**
     * 从微信端获取用户信息
     * 将用户信息包装到promise中返回
     */
    getUserInfo() {
      this.isShowLoginTooltip = false;
      return new Promise((resolve, reject) => {
        wx.getSetting({
          success: res => {
            if (res.authSetting["scope.userInfo"]) {
              wx.getUserInfo({
                success: res => {
                  resolve(res.userInfo);
                }
              });
            }
          }
        });
      });
    },
    /**
     * 拼接微信的getUserInfo和openId和学号等信息
     * 完成数据库用户注册
     */
    addUser(userInfo, openId) {
      const date = new Date();
      const userNewLogin = formatDatetime(date);
      this.$fly
        .post("/login/newUser", {
          nickName: userInfo.nickName,
          avatar: userInfo.avatarUrl,
          wxId: openId,
          userNewLogin: userNewLogin,
          phoneNum: "",
          studentNum: "",
          gender: userInfo.gender,
          city: userInfo.city,
          province: userInfo.province
        })
        .then(res => {
          if (res.data.message === "添加用户成功") {
            wx.showToast({
              icon: "none",
              title: "登录成功",
              duration: 2000
            });
          }
        });
    }
  },
  created() {
    this.login();
  }
};
</script>

<style>
.i-card-header-thumb {
  border-radius: 50%;
}
</style>
