<template>
  <div>
    <div class="container">
      <div class="row">
        <label class="name">动态发表</label>
      </div>
      <div class="row text">
        <div>
          <textarea
            v-model="article"
            class="input"
            maxlength="200"
            placeholder="填写动态信息"
          ></textarea>
          <label class="word-count">{{article.length}}/200</label>
        </div>
      </div>
      <div class="row">
        <div>
          <label class="name">相关截图（选填）</label>
          <label class="img-count">{{img_count}}/2</label>
        </div>
        <label v-for="(item, index) in src" :key="index">
          <img class="img" :src="item" />
        </label>

        <label v-if="img_count < 9" @click="uploadPicture">
          <img class="add-img" :src="addimage" />
        </label>
      </div>
    </div>
    <div>
      <i-button @click="submit" type="success" shape="circle" size="small">发布</i-button>
    </div>
  </div>
</template>>

<script>
import { formatDatetime } from "../../../utils/formatDatetime";

export default {
  data() {
    return {
      article: "",
      src: [],
      img_count: 0,
      addimage: "../../static/images/addimage.png",
      img_count: 0,
      temptSrc: [], //用来存上传至服务器的图片的地址
      wechat: "",
      word_coun: 0,
      imgFilePaths: [],
      i: 0,
      upLength: 0,
      picture: ""
    };
  },
  methods: {
    submit() {
      if (this.article.length !== 0) {
        const userInfo = this.$store.state.userInfo;
        const data = {
          article: this.article,
          picture: this.picture,
          view_count: 0,
          like_count: 0,
          comment_count: 0,
          type: "",
          creator: userInfo.id,
          user_ava: userInfo.avatar,
          username: userInfo.nick_name,
          create_time: formatDatetime(new Date()),
        };
        this.$fly.post("/dynamic/newDynamic", data).then(res => {
          this.article = ""
        })
      } else {
      }
    },
    editChanged() {
      console.log(this.article.length)
      this.word_count = this.article.length + 1;
    }
  }
};
</script>

<style scoped>
.container {
  background: #ffffff;
  font-size: 15px;
}
.text {
  height: 110px;
}
.row {
  border-bottom: 1px #e8e8e8 solid;
  padding: 5px 15px;
}
.name {
  width: 80%;
  height: 40px;
  line-height: 40px;
}
.input {
  width: 100%;
  height: 85px;
  font-size: 14px;
  padding-top: 5px;
}
.word-count {
  float: right;
  color: #808080;
}
.img-count {
  float: right;
  line-height: 40px;
  color: #808080;
}
.add-img {
  width: 80px;
  height: 80px;
}
.img {
  width: 66px;
  height: 66px;
  margin-bottom: 7px;
  margin-right: 10px;
}
.wechat-input {
  font-size: 14px;
}

.button {
  margin: 20px auto;
  width: 90%;
  border-radius: 5px;
  background: #ea5149;
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
}
</style>