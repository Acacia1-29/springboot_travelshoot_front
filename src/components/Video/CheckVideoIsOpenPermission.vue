
  
<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <div style="margin-bottom: 5px;">检测摄像头是否正常</div>

        </div>
        <div style="display: flex;align-items: center;justify-content: center;">
            <video :id="deviceId + 'video'" :width="videoWidth" :height="videoHeight" autoplay></video>
            <canvas :id="deviceId + 'canvas'" style="display: none" :width="videoWidth" :height="videoHeight"></canvas>
        </div>
        <div style="margin-top: 20px;display: flex">
            <el-button type="primary" @click="getCompetence()">打 开 摄 像 头</el-button>

        </div>


    </el-card>
</template>

<script>
export default {
    props: {
        deviceId: {
            type: String,
            default: 'test-1',
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

    },
    methods: {


        // 调用权限（打开摄像头功能）
        getCompetence() {
            var _this = this;
            this.thisCancas = document.getElementById(`${this.deviceId}canvas`);
            console.log(this.deviceId);
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
                        _this.$message.success("检测摄像头成功");
                        _this.$emit("SuccessCallBack")
                    };
                })
                .catch((err) => {
                    _this.$message.error("检测摄像头失败");
                    console.log(err);
                });
        },
    },
    created() { },
};
</script>



