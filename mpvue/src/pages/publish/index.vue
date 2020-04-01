<template>
  <div>
    <div class="container">
      <div class="row">
        <label class="name">动态发表</label>
      </div>
      <div class="row text">
        <div>
          <textarea v-model="article" class="input" maxlength="200" placeholder="填写动态信息"></textarea>
          <!-- word_count用来保存实时输入字数的长度 -->
          <label class="word-count">{{word_count}}/200</label>
        </div>
      </div>

      <div class="row">
        <div>
          <label class="name">相关截图（选填）</label>
          <label class="img-count">{{img_count}}/2</label>
        </div>
        <!-- v-for是vue的语法，循环语句，循环显示当前上传的照片 -->
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
import { post, get } from "@/utils";
export default {
  data() {
    return {
      article: "",
      src: [],
      img_count: 0,
      word_count: 0,
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

  //检测图以及数字的数量
  watch: {
    opinion() {
      this.word_count = this.article.length;
    },
    src() {
      this.img_count = this.src.length;
    }
  },
  methods: {
    uploadPicture() {
      let i = 0; // 多图上传时使用到的index
      let that = this;
      let max = that.maxImg; //最大选择数
      let upLength; //图片数组长度
      let imgFilePaths; //图片的本地临时文件路径列表
      wx.chooseImage({
        count: 9, //一次最多可以选择的图片张数
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          that.imgFilePaths = res.tempFilePaths;
          console.log("图片上传的路径为" + that.imgFilePaths);
          that.upLength = that.imgFilePaths.length;
          that.src.push(that.imgFilePaths);
        },
        fail: function() {
          console.log("fail");
        },
        complete: function() {
          console.log("commplete");
        }
      });
    },
    upLoad(imgPath, i, upLength) {
      let that = this;
      //上传文件

      wx.uploadFile({
        url: "http://localhost:3001/dynamic/upload", //对应dynamic下的upload方法
        filePath: imgPath[i],
        name: "file",
        header: {
          "Content-Type": "multipart/form-data"
        },
        success: function(res) {
          //接收upload返回的地址值存入数据库
          that.picture = res;
        },
        fail: function(res) {
          console.log(res);
          wx.hideLoading();
          wx.showModal({
            title: "错误提示",
            content: "上传图片失败",
            showCancel: false,
            success: function(res) {}
          });
        },
        complete: function() {
          i++;
          if (i == upLength) {
            wx.hideLoading(); //上传结束，隐藏loading
          } else {
            that.upLoad(imgPath, i, upLength);
          }
        }
      });
    },

    async submit() {
      //监控上传字数是否为零，
      if (this.word_count === 0) {
        wx.showLoading({
          title: "上传中..."
        });

        this.picture = this.upLoad(this.imgFilePaths, this.i, this.upLength); //上传操作

        const data = {
          article: this.article,
          picture: this.picture,
          view_count: 0,
          like_count: 0
        };
        console.log("picture:", data.picture);
        console.log("picture:", data.article);
        try {
          // await：等后端执行完毕之后再开始执行
          const res = await post("/dynamic/newDynamic", data);
          console.log("从后端返回的信息是", res);
          showModal("执行成功", "您的动态已发布");
        } catch (e) {
          showModal("提交失败", "服务器冒烟了，请稍后重试");
        }
      } else {
        showModal("提交失败", "反馈信息不能为空哦~");
      }
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