
  
   
<template>
    <div style="margin: 10px 0px;">
        <div v-if="loading"><el-skeleton :rows="12" animated /></div>
        <div v-else>
            <el-empty v-if="options.length == 0" description="没有更多的数据啦~"></el-empty>
            <div v-else>
                <waterfall :line-gap="lineGap" :watch="options" line="h" :fixed-height="true">
                    <!-- each component is wrapped by a waterfall slot -->
                    <waterfall-slot v-for="(item, index) in options" :width="item.width" :height="item.height"
                        :order="index" :key="item.Id">
                        <div class="box-item" :style="{ width: item.width + 'px', height: item.height + 'px' }"
                            @click="Select(item)">
                            <el-image :style="{ width: item.width + 'px', height: 200 + 'px' }" :src="item.imageUrls"
                                fit="cover"></el-image>
                            <p style="padding-left:15px;font-weight: bolder;color:rgb(3, 3, 3)">{{ item.title }}</p>
                        </div>
                    </waterfall-slot>
                </waterfall>

            </div>

            <!-- <el-empty description=" 暂时没有数据"></el-empty> -->

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
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import { FormatDateTime, ReplaceImagesHttp, GetObjectValue, LoadImage } from "@/utils/index";
import store from "@/store";
import { mapGetters } from "vuex";
export default {

    components: {
        Waterfall,
        WaterfallSlot
    },
    props: {


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
            lineGap: 255,

            firstLoad_: true, //是否首次加载

            loading: false, //是否正在获取数据中
            options: [],
            where_: {},
            pagination: {
                limit: 100,
                page: 1,
                total: 0,
                pageSizes: [1000, 2000],
            },


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

            let autoH = 250;
            var index = 0;
            for (var item of Items) {
                index++;
                console.log("执行次数" + index)
                let { width, height } = await LoadImage(GetObjectValue(item, this.$props.BindImageUrl));

                if (width == 0 || height == 0) {
                    width = 200;
                    height = 200;
                }
                //得到适配宽度
                let autoW = width * autoH / height;

                dataList.push({
                    title: GetObjectValue(item, this.$props.BindTitle),
                    imageUrls: GetObjectValue(item, this.$props.BindImageUrl),
                    viewCount: GetObjectValue(item, this.$props.BindViewCount),
                    author: GetObjectValue(item, this.$props.BindAuthor),
                    time: GetObjectValue(item, this.$props.BindDateTime),
                    content: GetObjectValue(item, this.$props.BindContent),
                    row: item,
                    width: Math.ceil(parseInt(autoW)),
                    height: Math.ceil(parseInt(autoH))
                });
            }
            this.options = dataList;
            console.log(this.options);
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
.box-item {

    position: relative;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
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
  
  

  
