<template>
    <el-button type="success" plain icon="el-icon-download" @click="ExportClick()">导 出</el-button>
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


        exportUrl: {
            type: String, //上传地址
            default: "",
        },
        where: {//搜索属性
            type: Object,
            default: () => { }
        },





    },
    watch: {

    },
    data() {
        return {

        }
    },
    created() {

    },
    methods: {

        /**
         * 导出
         */
        async ExportClick() {
            var query = JSON.stringify(this.$props.where);
            window.open(process.env.VUE_APP_BASE_API + `${this.$props.exportUrl}?query=` + query, '_blank')

        },
    }
}

</script>
  