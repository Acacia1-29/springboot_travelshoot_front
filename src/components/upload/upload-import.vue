<template>
  <div class="upload-files-wrap">
    <el-upload class="upload-demo" :action="importUrl" :show-file-list="true" :on-success="handleUploadFileSuccess"
      :limit="limit" :file-list="innerUploadFileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传xlsx资源文件</div>
    </el-upload>
  </div>
</template>

<script>
import { FormatDateTime, ReplaceSourceHttp, ReplaceDevlopmentSource, Clone } from "@/utils/index";
import store from "@/store";
import { boolean, number } from "yargs";
export default {
  filters: {
    FormatDateTimefilter: (value) => FormatDateTime(value),
  },
  props: {

    limit: {
      type: Number,
      default: 1,
    },
    url: {
      type: String,
      default: "",
    }
  },


  data() {
    return {
      importUrl: "",
      innerUploadFileList: []
    };
  },

  created() {
    this.importUrl = process.env.VUE_APP_BASE_API + this.url;
  },
  methods: {

    async handleUploadFileSuccess(response, file, fileList) {
      console.log(response);
      if (response.Success) {
        this.$message({
          message: '恭喜你，导入成功',
          type: 'success'
        });
        this.$emit("importSuccess");
      }
      else {
        this.$message.error(response.Msg);
        this.innerUploadFileList = [];
      }

    },

  },
};
</script>

<style scoped></style>
