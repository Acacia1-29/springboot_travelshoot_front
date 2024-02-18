
  
  
  
   
<template>
    <div style="margin: 10px 0px;">
        <div style="display: flex;justify-content: space-between;align-items: center;">
            <h2 style="border-left: 5px solid rgba(19, 149, 219);padding-left:5px;">{{ title }}</h2>
            <div style="flex:1;display: flex;justify-content: flex-end;align-items: center;">
                <el-input style="width: 350px;" v-model="content" :placeholder="placeholder"></el-input> <el-button
                    slot="append" icon="el-icon-search" @click="Search">搜索</el-button>
            </div>
        </div>
    </div>
</template>
  
<script>
import {
    post
} from "@/utils/http";
import { FormatDateTime, ReplaceImagesHttp, GetObjectValue } from "@/utils/index";
import store from "@/store";
import { mapGetters } from "vuex";
export default {

    props: {

        value: {
            type: [Number, String],
            default: ''
        },
        title: {
            type: String, //
            default: "",
        },
        placeholder: {
            type: String,
            default: "请输入你想搜索的内容"
        },
        url: {
            type: String, //默认的请求路径
            default: "",
        },
        searchProp: { //搜索属性
            type: Object
        },
        BindTitle: { //默认的列属性
            type: String, //默认的请求路径
            default: "",
        },
        BindImageUrl: {
            type: String,
            default: "",
        },
        BindAuthor: {
            type: String,
            default: "",
        },
        BindViewCount: {
            type: String,
            default: "",
        },
        BindDateTime: {
            type: String,
            default: "",
        },
        BindContent: {
            type: String,
            default: "",
        },

        where: {
            type: [Number, String, Object],
            default: ""
        },



    },
    watch: {
        "value": {
            immediate: true, //该回调将会在侦听开始之后被立即调用
            handler: function (n, o) {
                this.selectValue = n;
            }
        }
    },
    data() {
        return {
            selectValue: undefined,
            where_: {},


            content: undefined,

        }
    },
    created() {
        this.where_ = this.$props.where;

    },
    methods: {

        Search() {
            this.$emit('input', this.content);
            this.$emit('Search', this.content);
        }
    }
}

</script>
<style scoped>
.box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

}

.item {
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;

    justify-content: space-between;
}

.content-cut {

    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;

    line-height: 1.2em;
}

.card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    height: 100%;
    border-radius: 10px;


}

.custom-pagination {
    margin-top: 20px;
    display: flex;
    flex-direction: row-reverse;
}
</style>
  
  

  
  
  

