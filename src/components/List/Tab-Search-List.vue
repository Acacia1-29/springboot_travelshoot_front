
  
  
<template>
    <div style="margin: 10px 0px;">
        <div v-if="loading">加载中~~~~~~</div>
        <div v-else style="display: flex;flex-wrap: nowrap;cursor:pointer;color:grey;font-size: 20px;">
            <div style="font-weight: bolder;color:black;padding:5px">{{ title }}</div>
            <div @click="Select(undefined)" style="margin-left:20px;padding:5px"
                :class="active == undefined ? 'bg-theme' : ''">全部
            </div>
            <template v-for="(item, index) in options">
                <div @click="Select(item.value)" style="margin-left:20px;padding:5px"
                    :class="active == item.value ? 'bg-theme' : ''">
                    {{
                        item.name }}</div>
            </template>
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
        url: {
            type: String, //默认的请求路径
            default: "",
        },
        title: {
            type: String, //类型名称
            default: "",
        },
        searchProp: { //搜索属性
            type: Object
        },
        BindName: { //默认的列属性
            type: String, //默认的请求路径
            default: "",
        },
        BindValue: {
            type: String, //默认的请求路径
            default: "",
        },
        where: {},


    },
    watch: {
        "value": {
            immediate: true, //该回调将会在侦听开始之后被立即调用
            handler: function (n, o) {
                this.selectValue = n;
            }
        }
    },
    computed: {
        ...mapGetters(['name', 'roleTypeFormat', 'avatar', 'loginTimePeriod', "user", "userId"]),
    },
    data() {
        return {
            selectValue: undefined,
            firstLoad_: true, //是否首次加载
            active: undefined,
            loading: false, //是否正在获取数据中
            options: [],
            where_: {},
            pagination: {
                limit: 9999,
                page: 1,
                total: 0,
                pageSizes: [5, 10, 20, 50, 100],
            },


        }
    },
    created() {


        this.where_ = this.$props.where;

        this.FetchDataList();

    },
    methods: {

        InitData() {
            this.pagination.limit = 20;
            this.pagination.page = 1;
            this.pagination.total = 0;
            this.where_ = {};
        },
        async FetchDataList() {
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
                ...this.where_
            });
            this.loading = false;
            let dataList = [];
            Items.forEach((item, index) => {
                dataList.push({
                    name: GetObjectValue(item, this.BindName),
                    value: GetObjectValue(item, this.BindValue),
                });
            });
            console.log(dataList);
            this.options = dataList;
            this.pagination.total = TotalCount;
        },
        Select(value) {
            this.active = value;
            console.log(value);
            this.$emit('input', value);
            this.$emit('select', value);

        },

    }
}

</script>
  
  
  
