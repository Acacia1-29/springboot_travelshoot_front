
  <template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div style="margin-bottom: 5px;">设备名称:{{ label }}</div>
      <div style="margin-bottom: 5px;">识别间隔:{{ durtion }}(s)</div>

      <el-tag type="info" v-if="status == 0">未 开 启 摄 像 头</el-tag>
      <el-tag type="warning" v-if="status == 1">待 命 状 态</el-tag>
      <el-tag type="danger" v-if="status == 2">图 像 捕 捉 中</el-tag>
    </div>
    <div style="display: flex;align-items: center;justify-content: center;">
      <video :id="deviceId + 'video'" :width="videoWidth" :height="videoHeight" autoplay></video>
      <canvas :id="deviceId + 'canvas'" style="display: none" :width="videoWidth" :height="videoHeight"></canvas>
    </div>
    <div style="margin-top: 20px;display: flex">
      <el-button type="primary" @click="getCompetence()">打 开 摄 像 头</el-button>
      <el-button type="success" v-if="status == 1" @click="StartCature()">开 始 识 别</el-button>
      <el-button type="success" v-if="status == 2" @click="StopCature()">停 止 识 别</el-button>
      <el-button type="info" v-if="status != 0" @click="setImage()">拍 照</el-button>
    </div>


  </el-card>
</template>
    
<script>
export default {
  props: {
    deviceId: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    durtion: {
      type: Number,
      default: 10,
    }
  },
  data() {
    return {
      status: 0,//0未开启摄像头 //1待命 //2 开始上传 
      videoWidth: 400,
      videoHeight: 400,
      imgSrc: "",
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      thisTimeOut: undefined,
    };
  },

  beforeDestroy() {
    this.thisVideo.pause();
    this.thisVideo.srcObject = null;
    this.thisVideo = null;
    this.StopTimingUpload();
  },
  methods: {

    /**
     * 开始捕捉
     */
    async StartCature() {
      this.status = 2;
      this.TimingUpload();
    },
    /**
     * 停止捕捉
     */
    async StopCature() {
      this.status = 1;
      this.StopTimingUpload();
    },
    /**
     * 开始定时上传
     */
    async TimingUpload() {
      var _this = this;
      this.thisTimeOut = setInterval(async () => {
        if (this.status == 2) {

          // 点击，canvas画图
          _this.thisContext.drawImage(
            _this.thisVideo,
            0,
            0,
            _this.videoWidth,
            _this.videoHeight
          );
          // 获取图片base64链接
          var image = this.thisCancas.toDataURL("image/png");
          //进行人脸搜索接口调用
          var { Success, Data, Msg } = await this.$Post(`/Face/FaceSearch`, { Image: image });
          if (Success) {
            this.$emit("UploadFaceSuccess", { DeviceId: this.deviceId, Label: this.label, Result: JSON.parse(Data) });
          }
          else {
            this.$notify({
              title: '设备名称:' + this.label,
              message: '人脸识别失败'
            });
          }
        }
      }, this.durtion * 1000);

    },
    /**
     * 停止上传
     */
    async StopTimingUpload() {
      clearInterval(this.thisTimeOut);
    },

    base64ToFile(base64, fileName) {
      // 将base64按照 , 进行分割 将前缀  与后续内容分隔开
      const data = base64.split(",");
      // 利用正则表达式 从前缀中获取图片的类型信息（image/png、image/jpeg、image/webp等）
      const type = data[0].match(/:(.*?);/)[1];
      // 从图片的类型信息中 获取具体的文件格式后缀（png、jpeg、webp）
      const suffix = type.split("/")[1];
      // 使用atob()对base64数据进行解码  结果是一个文件数据流 以字符串的格式输出
      const bstr = window.atob(data[1]);
      // 获取解码结果字符串的长度
      let n = bstr.length;
      // 根据解码结果字符串的长度创建一个等长的整形数字数组
      // 但在创建时 所有元素初始值都为 0
      const u8arr = new Uint8Array(n);
      // 将整形数组的每个元素填充为解码结果字符串对应位置字符的UTF-16 编码单元
      while (n--) {
        // charCodeAt()：获取给定索引处字符对应的 UTF-16 代码单元
        u8arr[n] = bstr.charCodeAt(n);
      }
      // 利用构造函数创建File文件对象
      // new File(bits, name, options)
      const file = new File([u8arr], `${fileName}.${suffix}`, {
        type: type,
      });
      // 将File文件对象返回给方法的调用者
      return file;
    },
    //  绘制图片（拍照功能）
    setImage() {
      if (this.status == 0) {
        this.$message.error("请打开摄像头再操作");
        return;
      }
      var _this = this;
      // 点击，canvas画图
      _this.thisContext.drawImage(
        _this.thisVideo,
        0,
        0,
        _this.videoWidth,
        _this.videoHeight
      );
      // 获取图片base64链接
      var image = this.thisCancas.toDataURL("image/png");
      _this.imgSrc = image;
      const file = image;
      const time = this.label + new Date().valueOf();
      const name = time + ".png";
      const conversions = this.base64ToFile(file, name);
      const data = new FormData();
      data.append("file", conversions);
      // 生成一个a元素
      var a = document.createElement("a");
      // 创建一个单击事件
      var event = new MouseEvent("click");

      // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
      a.download = name || "下载图片名称";
      // 将生成的URL设置为a.href属性
      a.href = image;

      // 触发a的单击事件
      a.dispatchEvent(event);
    },
    // 调用权限（打开摄像头功能）
    getCompetence() {
      var _this = this;
      this.thisCancas = document.getElementById(`${this.deviceId}canvas`);
      this.thisContext = this.thisCancas.getContext("2d");
      this.thisVideo = document.getElementById(`${this.deviceId}video`); // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      } // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象 // 使用getUserMedia，因为它会覆盖现有的属性。 // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia =
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.getUserMedia; // 有些浏览器不支持，会返回错误信息 // 保持接口一致
          if (!getUserMedia) {
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          } // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      var constraints = {
        audio: false,
        video: {
          deviceId: this.deviceId,
          width: this.videoWidth,
          height: this.videoHeight,
          transform: "scaleX(-1)",
        },
      };
      console.log("constraints", constraints)

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {

          // 旧的浏览器可能没有srcObject
          if ("srcObject" in _this.thisVideo) {

            _this.thisVideo.srcObject = stream;
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream);

          }
          _this.thisVideo.onloadedmetadata = function (e) {
            console.log("onloadedmetadata");
            _this.status = 1;
            _this.thisVideo.play();
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() { },
};
</script>
  
  
