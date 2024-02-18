
  
  
   
<template>
    <div style="margin: 10px 0px;">
        <div v-if="loading"><el-skeleton :rows="12" animated /></div>
        <div v-else>
            <el-empty v-if="options.length == 0" description="没有更多的数据啦~"></el-empty>
            <div v-else class="box">

                <div v-for="(item, index) in options" class="item" @click="Select(item.row)">

                    <el-image style="width: 160px; height: 160px;border-radius: 10px;" :src="item.imageUrls"
                        fit="fit"></el-image>

                    <div
                        style="flex:1;padding-left: 20px;display: flex;flex-direction: column;justify-content: space-between;">
                        <div style="font-weight: bolder;font-size: 25px;">{{ item.title }}</div>
                        <div style="width:100% font-size: 18px;letter-spacing: 1px;color:gray;margin-top:12px"
                            class="content-cut">{{
                                item.content }}</div>

                        <div style="font-size: 18px;letter-spacing: 1px;color:rgb(74, 70, 70);margin-top:10px">作者:{{
                            item.author }}
                        </div>
                    </div>
                    <div style="width: 150px;" class="text-cut">
                        <span style="color: grey;">{{ item.time }}</span>
                    </div>
                    <slot name="bottomleft" :row="item.row"></slot>


                </div>

            </div>

            <!-- <el-empty description="暂时没有数据"></el-empty> -->

        </div>

        <div class="custom-pagination">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="pagination.page" :page-sizes="pagination.pageSizes" :page-size="pagination.limit"
                layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
            </el-pagination>
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

    },
    data() {
        return {
         
            firstLoad_: true, //是否首次加载

            loading: false, //是否正在获取数据中
            options: [],
            where_: {},
            pagination: {
                limit: 15,
                page: 1,
                total: 0,
                pageSizes: [15, 20, 50, 100],
            },
            selectOption: {},
            selectValue: undefined,

        }
    },
    created() {
        this.where_ = this.$props.where;
        this.FetchDataList();
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
                    title: GetObjectValue(item, this.$props.BindTitle),
                    imageUrls: GetObjectValue(item, this.$props.BindImageUrl),
                    viewCount: GetObjectValue(item, this.$props.BindViewCount),
                    author: GetObjectValue(item, this.$props.BindAuthor),
                    time: GetObjectValue(item, this.$props.BindDateTime),
                    content: this.RepalceHtml(GetObjectValue(item, this.$props.BindContent)),
                    row: item,

                });
            });
            this.options = dataList;
            this.pagination.total = TotalCount;
        },
        Select(row) {
            this.$emit("SigleClick", row);
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
  
  

  
