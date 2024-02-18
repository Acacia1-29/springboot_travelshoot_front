<template>
    <div>
        <div v-if="contentShow == false">
            <el-skeleton :rows="24" animated />
        </div>
        <div class="content" v-else style="min-height:400px" v-html="content"></div>
    </div>
</template>
  
<script>
import { post } from "@/utils/http";
import { Debounce } from "@/utils/index"
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

        setTimeout(() => {
            this.contentShow = true;
        }, 200);
    },
    methods: {


    }
}
</script>

<style lang="scss" scoped>
.content {
    padding: 10px 20px 5px;
    color: #555;
    font-size: 16px;
    line-height: 32px;
    word-break: break-all;
    word-wrap: break-word;
    position: relative;

}
</style>