
   
<template>
    <div style="margin: 10px 0px;">
        <div v-if="loading">
            <el-skeleton :rows="12" animated />
        </div>
        <div v-else>
            <el-empty v-if="options.length == 0" description="没有更多的数据啦~"></el-empty>
            <div v-else class="box">

                <div v-for="(item, index) in options" class="item">
                    <div class="card" @click="Select(item.row)">
                        <div>
                            <el-image style="width: 100%; height: 300px" :src="item.imageUrls" fit="fit"></el-image>
                        </div>
                        <div style="padding:10px" class="text-cut">
                            <span style="font-weight: bolder;">{{ item.title }}</span>
                        </div>
                        <div style="padding:10px" class="text-cut">
                            <span style="">{{ item.desc }}</span>
                        </div>
                        <slot name="bottomleft" :row="item.row"></slot>


                    </div>
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
    computed: {
        ...mapGetters([
            'name', 'roleTypeFormat', 'avatar', 'loginTimePeriod', "user"
        ])
    },
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
        columnName: { //默认的列属性
            type: String, //默认的请求路径
            default: "",
        },
        BindImageUrls: {
            type: String,
            default: "",
        },
        BindTitle: {
            type: String,
            default: "",
        },
        BindDesc: {
            type: String,
            default: "",
        },
        columnValue: {
            type: String, //默认的请求路径
            default: "",
        },
        where: {},



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
                limit: 30,
                page: 1,
                total: 0,
                pageSizes: [30, 50, 100],
            },
            selectOption: {},
            selectValue: undefined,

        }
    },
    created() {

        console.log("created", this.$props.where)
        this.where_ = this.$props.where;

        this.FetchDataList();

    },
    methods: {

        InitData() {
            this.pagination.limit = 30;
            this.pagination.page = 1;
            this.pagination.total = 0;

            this.where_ = {};
        },
        async reload(where) {
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
            }, 200);
            let dataList = [];
            Items.forEach((item, index) => {
                let content = this.RepalceHtml(GetObjectValue(item, this.$props.BindDesc));
                if (content.length > 30) {
                    content = content.substring(0, 30) + "...";
                }
                dataList.push({
                    imageUrls: GetObjectValue(item, this.$props.BindImageUrls),
                    title: GetObjectValue(item, this.$props.BindTitle),
                    desc: content,
                    value: item[`${this.columnValue}`],
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
           if (!str) {
                return "";
            }
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
    width: 25%;
    padding: 5px;
    box-sizing: border-box;
}

.item:nth-child(odd) {
    padding-left: 10px;
}

.item:nth-child(even) {
    padding-right: 10px;
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
  
  
  

  
  
