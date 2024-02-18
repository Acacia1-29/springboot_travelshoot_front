
   
<template>
    <div style="margin: 0px 0px;">
        <div v-if="loading"></div>
        <div v-else style="background-color: rgb(223, 220, 220);padding:10px">
            <el-marquee-tips :content="content" :speed="speed"></el-marquee-tips>
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
        url: {
            type: String, //默认的请求路径
            default: "",
        },
        searchProp: { //搜索属性
            type: Object
        },
        BindUrl: {
            type: String,
            default: "Url",
        },
        BindId: {
            type: String,
            default: "Id",
        },
        BindContent: {
            type: String,
            default: "Content",
        },


        where: {
            type: [Number, String, Object],
            default: ""
        },



    },
    watch: {

    },
    data() {
        return {
            pagination: {
                limit: 10,
                page: 1,
                total: 0,
                pageSizes: [15, 20, 50, 100, 200, 500, 1000],
            },
            content: "",
            speed: 5,
            firstLoad_: true, //是否首次加载

            loading: false, //是否正在获取数据中
            options: [],
            where_: {},
            pagination: {
                limit: 9999,
                page: 1,
                total: 0,
                pageSizes: [15, 20, 50, 100],
            },
            selectOption: {},
            selectValue: undefined,
            postion: 0,
            timingId: undefined,

        }
    },
    created() {
        this.where_ = this.$props.where;
        this.FetchDataList();
    },
    destroyed() {
        clearTimeout(this.timingId);
    },
    methods: {

        InitData() {
            this.pagination.limit = 15;
            this.pagination.page = 1;
            this.pagination.total = 0;

            this.where_ = {};
        },
        async Reload(where) {
            this.pagination.page = 1;
            this.pagination.total = 0;
            var searchWhere = {};
            if (where) {
                searchWhere = Object.assign(searchWhere, where);
            }
            this.FetchDataList(searchWhere);
        },
        async FetchDataList(searchWhere) {
            this.loading = true;
            let {
                Data: {
                    Items,
                    TotalCount
                }
            } = await post(this.$props.url, {
                limit: this.pagination.limit,
                size: this.pagination.limit,
                page: this.pagination.page,
                ...this.where_,
                ...searchWhere
            });
            setTimeout(() => {
                this.loading = false;
            }, 600);

            let dataList = [];
            Items.forEach((item, index) => {
                dataList.push({
                    content: this.RepalceHtml(GetObjectValue(item, this.$props.BindContent)),
                    url: GetObjectValue(item, this.$props.BindUrl),
                    id: GetObjectValue(item, this.$props.BindId),

                    row: item,

                });
            });


            this.options = dataList;
            this.pagination.total = TotalCount;
            if (this.pagination.total > 0) {
                this.Timing();
            }
        },
        Timing() {
            this.timingId = setTimeout(() => {
                this.content = this.options[this.postion].content;
                this.postion++;
                if (this.postion > this.options.length) {
                    this.postion = 0;
                }

                this.speed = (this.content.length / 5);
                this.Timing();


            }, this.speed * 1000);
        },
        Select(row) {
            this.$emit("select", row);
        },
        handleCurrentChange(event) {
            this.pagination.page = event;
            this.FetchDataList();
        },
        handleSizeChange(event) {
            this.pagination.limit = event;
            this.pagination.page = 1;

            this.FetchDataList();
        },
        RepalceHtml(str) {
            return str.replace(/<[^>]+>|&[^>]+;/g, "").trim();//去掉所有的html标签和&nbsp;之类的特殊符合return str;}text = repalceHtml(text);
        },

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
    -webkit-line-clamp: 6;

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
  
  
