
  
  
  
  
   
<template>
    <div style="margin: 10px 0px;">
        <div v-if="loading"><el-skeleton :rows="12" animated /></div>
        <div v-else>
            <el-empty v-if="options.length == 0" description="看官，数据正在维护中"></el-empty>
            <div v-else class="box">

                <div v-for="(item, index) in options" class="item" @click="Select(item.row)">
                    <slot name="content" :row="item.row"></slot>
                </div>

            </div>

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

        BindImageUrl: {
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
                    imageUrls: GetObjectValue(item, this.$props.BindImageUrl),
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
    box-sizing: border-box;

}

.item {
    width: 100%;
    padding: 5px;
    box-sizing: border-box;

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
  
  

  

  
