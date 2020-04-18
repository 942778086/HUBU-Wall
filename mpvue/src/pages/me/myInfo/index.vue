<template>
  <div class="myInfo">
    <div class="title-room">
      <div class="title-color"></div>
      <div class="title">信息完整度</div>
    </div>
    <i-progress :percent="infoProgress"></i-progress>
    <div class="title-room">
      <div class="title-color"></div>
      <div class="title">基本信息</div>
    </div>
    <br />
    <div class="ava-room">
      <image class="ava" :src="ava" />
      <p class="subText" @click="updateWxInfo">更新微信信息</p>
    </div>
    <i-input :value="nickName" title="昵称" disabled />
    <i-input :value="phoneNum" @change="changeContact" maxlength="50" title="联系方式" />
    <i-input :value="schoolNum" @change="changeSchoolNum" maxlength="50" title="学号" />
    <i-input :value="gender" title="性别" />
    <i-input
      :value="department"
      title="学院"
      @click="showSelector = true"
      @input="avoidInput"
      placeholder="点击选择"
    />
    <i-input :value="province" title="省份" disabled />
    <i-input :value="city" title="城市" disabled />
    <i-button class="sava-btn" @click="save" type="primary" long="true">保存</i-button>
    <i-action-sheet
      :visible="showSelector"
      :actions="departList"
      @cancel="showSelector = fasle"
      mask-closable="true"
    >
      <div slot="header" style="padding: 16px">
        <div @click="chooseDepart('教育学院')" class="departList">教育学院</div>
        <div @click="chooseDepart('艺术学院')" class="departList">艺术学院</div>
        <div @click="chooseDepart('计算机学院')" class="departList">计算机学院</div>
        <div @click="chooseDepart('商学院')" class="departList">商学院</div>
        <div @click="chooseDepart('数统学院')" class="departList">数统学院</div>
        <div @click="chooseDepart('资环学院')" class="departList">资环学院</div>
      </div>
    </i-action-sheet>
    <i-message id="message" />
  </div>
</template>

<script>
const { $Message } = require("../../../../static/iview/base/index");

export default {
  data() {
    return {
      userId: 0,
      infoProgress: 0,
      nickName: "",
      phoneNum: "",
      schoolNum: "",
      gender: 0,
      department: "",
      province: "",
      city: "",
      ava: "",
      showSelector: false
    };
  },
  onShow() {
    let userInfo = this.$store.state.userInfo;
    this.userId = userInfo.id;
    this.ava = userInfo.avatar;
    this.nickName = userInfo.nick_name;
    this.phoneNum = userInfo.phone_num || "";
    this.schoolNum = userInfo.student_num || "";
    this.gender = userInfo.gender === "1" ? "男" : "女";
    this.department = userInfo.department || "";
    this.province = userInfo.province || "";
    this.city = userInfo.city || "";
    this.refreshProgress();
  },
  methods: {
    avoidInput() {
      return;
    },
    chooseDepart(department) {
      this.department = department;
      this.showSelector = false;
      this.refreshProgress();
    },
    changeContact(e) {
      this.phoneNum = e.mp.detail.detail.value;
      this.refreshProgress();
    },
    changeSchoolNum(e) {
      this.schoolNum = e.mp.detail.detail.value;
      this.refreshProgress();
    },
    save() {
      this.$fly
        .put("/user/editUser", {
          id: this.userId,
          phone_num: this.phoneNum,
          student_num: this.schoolNum,
          department: this.department
        })
        .then(() => {
          $Message({
            content: "修改完成",
            type: "success"
          });
          this.refreshUserInfo();
        });
    },
    refreshProgress() {
      let notComplate = 0;
      !this.phoneNum && notComplate++;
      !this.schoolNum && notComplate++;
      !this.gender === "" && notComplate++;
      !this.department && notComplate++;
      !this.province && notComplate++;
      !this.city && notComplate++;
      this.infoProgress = [1 - parseFloat(notComplate / 8).toFixed(2)] * 100;
    },
    updateWxInfo() {
      wx.getUserInfo({
        success: res => {
          let userInfo = res.userInfo;
          this.$fly
            .put("/user/editUser", {
              id: this.userId,
              nick_name: userInfo.nickName,
              avatar: userInfo.avatarUrl,
              province: userInfo.province,
              city: userInfo.city
            })
            .then(() => {
              $Message({
                content: "更新成功",
                type: "success"
              });
              this.refreshUserInfo();
            });
        }
      });
    },
    refreshUserInfo() {
      this.$fly.get("user/getUser?id=" + this.userId).then(res => {
        this.$store.state.userInfo = res.data[0];
      });
    }
  }
};
</script>

<style>
.title-color {
  background-color: #f1939c;
  width: 8px;
  height: 20px;
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;
}
.myInfo {
  position: absolute;
  width: 100%;
  min-height: 100%;
  background: linear-gradient(to bottom, #91eae4, #86a8e7, #7f7fd5);
}
.ava {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 8px solid #f1939c;
}
.ava-room {
  width: 100%;
  text-align: center;
}
.title {
  font-size: 13px;
  font-weight: bold;
  line-height: 20px;
}
.subText {
  font-size: 13px;
  color: gray;
  font-weight: 500;
}
.save-btn {
  margin: 30px;
}
.title-room {
  height: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.departList {
  font-size: 13px;
  color: rgb(53, 53, 53);
  margin: 5px;
}
</style>