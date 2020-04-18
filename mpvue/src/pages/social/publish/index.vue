<template>
  <div>
    <i-message id="message" />
    <div class="container">
      <div class="row">
        <label class="name">动态发表</label>
      </div>
      <div class="row text">
        <div>
          <textarea v-model="article" class="input" maxlength="200" placeholder="填写动态信息"></textarea>
          <label class="word-count">{{article.length}}/200</label>
        </div>
      </div>
      <div class="row">
        <div>
          <label class="name">上传图片</label>
          <label class="img-count">{{picture.length}}/2</label>
        </div>
        <label v-for="(item, index) in picture" :key="index">
          <img class="img" :src="item" />
        </label>
        <div class="photo" @click="addPhoto">
          <image
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg3MDE3Mjk5MTU2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIyMzIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTg2NS4xNjA5MyA2MzguODg4NjgydjE0OS43MTAzODhjMCAzOC42OTc2NzQtMzEuNDc0MTA5IDcwLjE3MTc4My03MC4xNzE3ODMgNzAuMTcxNzgzSDIyOS4wMTA4NTNjLTM4LjY5NzY3NCAwLTcwLjE3MTc4My0zMS40NzQxMDktNzAuMTcxNzgzLTcwLjE3MTc4M3YtMTQ5LjcxMDM4OGgtNTkuNTM0ODg0djE0OS43MTAzODhjMCA3MS41MjEyNCA1OC4xODU0MjYgMTI5LjcwNjY2NyAxMjkuNzA2NjY3IDEyOS43MDY2NjZoNTY1Ljk3ODI5NGM3MS41MjEyNCAwIDEyOS43MDY2NjctNTguMTg1NDI2IDEyOS43MDY2NjctMTI5LjcwNjY2NnYtMTQ5LjcxMDM4OGgtNTkuNTM0ODg0ek00NzYuNzU1MzQ5IDIwOS43MjE1NXYzMjguNTkyODY5aDU5LjUzNDg4NHYtMzMzLjM5NTM0OWwxMjguMTE5MDY5IDEyOC4xMTkwNyA0Mi4xMTEwMDgtNDIuMTExMDA4LTE5Ny42MTYxMjQtMTk3LjU3NjQzNC0xOTEuNDI0NDk2IDE5MS40MjQ0OTZMMzU5LjU5MDY5OCAzMjYuODg2MjAyeiIgZmlsbD0iIzEyOTZkYiIgcC1pZD0iMjIzMyI+PC9wYXRoPjxwYXRoIGQ9Ik0zMjkuNDI2MzU3IDcwNi4zNjE1NWgzNjUuMTQ3Mjg2djU5LjUzNDg4NEgzMjkuNDI2MzU3eiIgZmlsbD0iIzEyOTZkYiIgcC1pZD0iMjIzNCI+PC9wYXRoPjwvc3ZnPg=="
          />
        </div>
      </div>
    </div>
    <div>
      <i-button @click="submit" type="success" shape="circle" size="small">发布</i-button>
    </div>
  </div>
</template>>

<script>
import { formatDatetime } from "../../../utils/formatDatetime";
const {$Message} = require('../../../../static/iview/base/index');

const COS = require("cos-wx-sdk-v5");
const Bucket = "wjxcloud-1258315462";
const Region = "ap-guangzhou";
const cos = new COS({
  getAuthorization: function(options, callback) {
    const authorization = COS.getAuthorization({
      SecretId: "AKID0pRoyuu5JcgVBfhzpQ1azEE7mIZTkduw",
      SecretKey: "zqV1DAtTs2wb0FFzc09boMgqnZ7g3Seb",
      Method: options.Method,
      Pathname: options.Pathname,
      Query: options.Query,
      Headers: options.Headers,
      Expires: 60
    });
    callback({
      Authorization: authorization
    });
  }
});

export default {
  data() {
    return {
      article: "",
      picture: []
    };
  },
  methods: {
    submit() {
      if (this.article.length !== 0) {
        const userInfo = this.$store.state.userInfo;
        const data = {
          article: this.article,
          picture: this.picture.join(","),
          view_count: 0,
          like_count: 0,
          comment_count: 0,
          type: "",
          creator: userInfo.id,
          user_ava: userInfo.avatar,
          username: userInfo.nick_name,
          create_time: formatDatetime(new Date())
        };
        this.$fly.post("/dynamic/newDynamic", data).then(res => {
          this.article = "";
          this.picture = [];
          $Message({
            content: "动态发布成功",
            type: "success"
          });
        });
      } else {
        $Message({
            content: '输入内容不能为空',
            type: 'warning'
        });
      }
    },
    addPhoto() {
      const that = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original"], // 可以指定是原图还是压缩图，默认用原图
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          const filePath = res.tempFiles[0].path;
          const filename = filePath.substr(filePath.lastIndexOf("/") + 1);
          cos.postObject(
            {
              Bucket: Bucket,
              Region: Region,
              Key: filename,
              FilePath: filePath,
              onProgress: function(info) {
              }
            },
            function(err, data) {
              const data1 = err || data;
              const imgUrl = "https://" + data1.Location;
              that.picture.push(imgUrl);
            }
          );
        }
      });
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