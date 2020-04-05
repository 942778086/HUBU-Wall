<template>
  <div>
    <i-action-sheet :visible="showLoginSheet" show-cancel mask-closable="false">
      <view slot="header" style="padding: 16px">
        <i-button open-type="getUserInfo" @getuserinfo="getUserAndReg">获取用户信息(授权登录)</i-button>
      </view>
    </i-action-sheet>
  </div>
</template>

<script>
import { formatDatetime } from "../../utils/formatDatetime";

export default {
  data() {
    return {
      showLoginSheet: false
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
            this.$fly
              .get("/login/getOpenId", {
                code: res.code
              })
              .then(res => {
                if (typeof res.data === "string") {
                  this.showLoginSheet = true;
                  this.openId = res.data;
                } else {
                  this.$store.state.userInfo = res.data;
                  console.log(res.data);
                  wx.showToast({
                    icon: "none",
                    title: "登录成功",
                    duration: 2000
                  });
                }
              });
          }
        }
      });
    },
    /**
     * 从微信端获取用户信息
     * 将用户信息包装到promise中返回
     */
    getUserAndReg() {
      this.showLoginSheet = false;
      wx.getSetting({
        success: res => {
          if (res.authSetting["scope.userInfo"]) {
            wx.getUserInfo({
              success: res => {
                this.addUser(res.userInfo);
              }
            });
          } else {
            wx.authorize({
              scope: "scope.userInfo",
              success(res) {
                wx.getUserInfo({
                  success: res => {
                    this.addUser(res.userInfo);
                  }
                });
              },
              fail: err => {
                console.log(err);
              }
            });
          }
        },
        fail: err => {
          console.log(err);
        }
      });
    },
    /**
     * 拼接微信的getUserInfo和openId和学号等信息
     * 完成数据库用户注册
     */
    addUser(userInfo) {
      const date = new Date();
      const userNewLogin = formatDatetime(date);
      this.$fly
        .post("/login/newUser", {
          nickName: userInfo.nickName,
          avatar: userInfo.avatarUrl,
          wxId: this.openId,
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
              title: "欢迎体验！",
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