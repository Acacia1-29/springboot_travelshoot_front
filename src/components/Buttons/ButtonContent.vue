<template>
    <span style="margin-left:10px;margin-right: 10px;">
        <el-button type="text" icon="el-icon-tickets" @click="ShowImport()">内容浏览</el-button>
        <el-dialog  title="内容查看" :visible.sync="contentShow" width="90%" :lock-scroll="true" height="800px">
            <div style="height:600px;overflow-y: scroll;" v-html="content"></div>

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

        content: {
            type: String,//默认的请求路径
            default: "",
        },
    },
    watch: {

    },
    data() {
        return {
            contentShow: false,
        }
    },
    created() {



    },
    methods: {
        ShowImport() {
            this.contentShow = true;
        }


    }
}

</script>
  