
  <template>
    <div>
        <el-button style="display: inline;" type="text" @click="ShowFaceToast()">人 脸 上
            传</el-button>
        <el-dialog :append-to-body="true" title="人 脸 采 集" :visible="editorShow" :width="videoWidth" :lock-scroll="true"
            height="600px">
            <el-row v-if="editorShow == true" :gutter="10" style="display: flex;">
                <div> <video id="video" :width="videoWidth" :height="videoHeight" autoplay></video>
                    <canvas id="canvas" style="display: none" :width="videoWidth" :height="videoHeight"></canvas>
                </div>

                <div style="padding:10px">
                    <h2>操作提示:</h2>
                    <p>1:采集人脸之前需要打卡摄像头</p>
                    <p>2:删除人脸会删除你拥有的人脸所有数据</p>
                    <p>3:最大可上传20个人脸头像,上传的越多检测的效率越高</p>
                    <p>4:尽量多采集人脸的多个部位,比如正脸、左侧脸、右侧脸、上侧脸、下侧脸等等数据</p>
                    <div v-if="videoStatus != 0">当前上传的人脸:{{ FaceCount }}个</div>

                </div>

            </el-row>
            <el-row type="flex" justify="end" align="bottom">
                <el-button type="primary" plain @click="getCompetence()">打 开 摄 像 头</el-button>
                <el-button type="primary" plain @click="setImage()">图 片 下 载</el-button>
                <el-button type="primary" plain @click="FaceDel()">人 脸 删 除</el-button>

                <el-button type="primary" plain @click="UploadFace()">采 集 人 脸</el-button>
                <el-button @click="Close()">取 消</el-button>
            </el-row>
        </el-dialog>
    </div>
</template>
      
<script>
export default {
    props: {
        userId: { type: String, default: "" }
    },
    data() {
        return {
            editorShow: false,
            videoWidth: 500,
            videoHeight: 500,
            imgSrc: "",
            thisCancas: null,
            thisContext: null,
            thisVideo: null,
            FaceCount: 0,
            videoStatus: 0,//待录像  录像中 
        };
    },
    mounted() {

    },
    methods: {
        ShowFaceToast() {
            this.editorShow = true;
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
        /**
         * 查询人脸
         */
        async FaceList() {
            var { Success, Data, Msg } = await this.$Post(`/Face/UserFace`, { UserId: this.userId });

            this.FaceCount = Data.length;
        },
        /**
         * 清除人脸
         */
        async FaceDel() {
            if (this.videoStatus == 0) {
                this.$message.error("你先打开摄像头");
                return;
            }
            if (this.FaceCount == 0) {
                this.$message.error("没有需要删除的人脸");
                return;
            }
            let confirm = await this.$comm.ConfirmMessageBox({ content: "你确定要删除吗?" });
            if (confirm) {
                var { Success, Data, Msg } = await this.$Post(`/Face/UserFaceDel`, { UserId: this.userId });

                await this.FaceList();

                this.$emit("UploadFaceSuccess", { FaceToken: Data, UserId: this.userId, FaceCount: this.FaceCount });
            }
        },
        /**
         * 上传人脸
         */
        async UploadFace() {
            if (this.videoStatus == 0) {
                this.$message.error("你先打开摄像头");
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

            var { Success, Data, Msg } = await this.$PostLoading(`/Face/UploadFace`, { Image: image, UserId: this.userId });
            if (Success) {
                await this.FaceList();
                this.$emit("UploadFaceSuccess", { FaceToken: Data, UserId: this.userId, FaceCount: this.FaceCount });
                // this.editorShow = false;
            }

        },
        async Close() {
            this.editorShow = false;
            this.videoStatus = 0;
        },
        //  绘制图片（拍照功能）
        setImage() {
            if (this.videoStatus == 0) {
                this.$message.error("你先打开摄像头");
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
            const time = new Date().valueOf();
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
            this.thisCancas = document.getElementById(`canvas`);
            this.thisContext = this.thisCancas.getContext("2d");
            this.thisVideo = document.getElementById(`video`); // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
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
                    width: this.videoWidth,
                    height: this.videoHeight,
                    transform: "scaleX(-1)",
                },
            };
            console.log("constraints", constraints)

            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(function (stream) {
                    console.log("获取流");
                    // 旧的浏览器可能没有srcObject
                    if ("srcObject" in _this.thisVideo) {

                        _this.thisVideo.srcObject = stream;
                    } else {
                        // 避免在新的浏览器中使用它，因为它正在被弃用。
                        _this.thisVideo.src = window.URL.createObjectURL(stream);

                    }
                    _this.thisVideo.onloadedmetadata = function (e) {

                        _this.videoStatus = 1;
                        _this.thisVideo.play();
                        _this.FaceList();
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
    
