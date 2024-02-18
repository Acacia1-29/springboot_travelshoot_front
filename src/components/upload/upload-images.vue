<template>
  <div class="upload-files-wrap">
    <el-upload :action="uploadUrl" list-type="picture-card" :show-file-list="true" :on-success="handleUploadSuccess"
      :on-remove="handleRemove" :file-list="fileList" accept=".jpg,.png,.jpeg" :limit="limit" :multiple="true">
      <i class="el-icon-plus"></i>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-upload>
  </div>
</template>

<script>
import { FormatDateTime, ReplaceImageHttp, GetFileNameByPath } from "@/utils/index";
import store from "@/store";
export default {
  filters: {
    FormatDateTimefilter: (value) => FormatDateTime(value),
  },
  props: {
    value: { type: [Number, String], default: '' },

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
      uploadUrl: process.env.VUE_APP_BASE_API + "/Resources/BatchUpload",
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: []

    };
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
    },
    async handleRemove(file, fileList) {
      let fs = this.FileListConvert(fileList);
      let url = fs.length > 0 ? fs.map(x => x.url).join(",") : "";
      this.$emit('input', url);
    },
  },
};
</script>

<style scoped>
.uploadImage {
  background-color: transparent;
}

.el-upload--picture-card {
  background-color: transparent !important;
}
</style>
