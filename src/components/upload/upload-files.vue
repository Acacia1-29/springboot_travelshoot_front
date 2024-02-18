<template>
  <div class="upload-files-wrap">
    <el-upload class="upload-demo" :action="uploadUrl" :show-file-list="true" :on-success="handleUploadSuccess"
      :on-remove="handleRemove" :limit="limit" :multiple="true" :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">请上传资源文件<span
          style="padding-left:10px;color:rgb(237, 95, 24)">最大可上传大小不超过1GB:</span>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { FormatDateTime, ReplaceImageHttp, GetFileNameByPath } from "@/utils/index";
import store from "@/store";
import { boolean, number } from "yargs";
export default {
  filters: {
    FormatDateTimefilter: (value) => FormatDateTime(value),
  },
  props: {

    value: {
      type: [Number, String],
      default: ''
    },
    limit: {
      type: Number,
      default: 1,
    },
  },
  watch: {
    "value": {
      immediate: true,//该回调将会在侦听开始之后被立即调用
      handler: function (n, o) {
        if (n) {
          this.fileList = n.split(",").map(x => { return { url: ReplaceImageHttp(x), name: GetFileNameByPath(ReplaceImageHttp(x)), status: "success" }; });
        }
      }
    }
  },

  data() {
    return {
      uploadUrl: store.getters.uploadUrl,
      fileList: []
    };
  },

  created() {

  },
  methods: {
    FileListConvert(files) {
      let list = [];
      if (Array.isArray(files)) {
        files.filter(x => x.status == "success").forEach((item) => {
          if (item.response != null) {
            list = [...list, { name: "", url: ReplaceImageHttp(item.response.Data[0].Url) }];
          }
          else {
            list = [...list, item];
          }
        })
      }

      return list;
    },

    async handleUploadSuccess(response, file, fileList) {

      let fs = this.FileListConvert(fileList);
      let url = fs.length > 0 ? fs.map(x => x.url).join(",") : "";
      this.$emit('input', url);

      var obj = {};

      if (file.name.indexOf(".mp4") != -1 || file.name.indexOf(".mp3") != -1) {
        let video = await this.$comm.CheckSize([file.raw], true);
        obj.videoWidth = video.videoWidth;
        obj.videoHeight = video.videoHeight;
        obj.duration = video.duration;
      }
      this.$emit("change", obj);
    },
    async handleRemove(file, fileList) {
      let fs = this.FileListConvert(fileList);
      let url = fs.length > 0 ? fs.map(x => x.url).join(",") : "";
      this.$emit('input', url);
    },
  },
};
</script>

<style scoped></style>
