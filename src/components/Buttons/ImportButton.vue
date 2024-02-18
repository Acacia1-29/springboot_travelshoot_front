<template>
    <span style="margin-left:10px;margin-right: 10px;">
        <el-button type="warning" plain icon="el-icon-upload" @click="ShowImport()">导 入</el-button>
        <el-dialog  title="文件导入" :visible.sync="importShow" width="40%" :lock-scroll="true" height="800px">
            <el-form v-if="importShow == true" label-width="80px" size="mini">
                <el-row :gutter="10">
                    <el-col :span="24">
                        <el-form-item label="模板地址" prop="userName">
                            <el-download-a :url="templeteUrl"></el-download-a>

                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="资源" prop="avatar">
                            <el-upload-import @importSuccess="ImportSuccess" :limit="1" :url="uploadUrl"></el-upload-import>

                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
        </el-dialog>
    </span>
</template>
  
<script>
import {
    post
} from "@/utils/http";
import {
    Debounce
} from "@/utils/index"
import store from "@/store";
export default {

    props: {


        uploadUrl: {
            type: String, //上传地址
            default: "",
        },
        templeteUrl: {
            type: String, //模板地址
            default: "",
        },




    },
    watch: {

    },
    data() {
        return {
            importShow: false,

        }
    },
    created() {



    },
    methods: {

        async ImportSuccess() {
            this.importShow = false;
            this.$emit('ButtonImportSuccess');
        },
        /**
        * 导入弹窗
         */
        async ShowImport() {
            this.importShow = true;

        },
    }
}

</script>
  