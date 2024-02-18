
  
   
<template>
    <el-select :disabled="disabled" v-model="selectValue" filterable placeholder="请选择" :filterable="true" :loading="loading"
        :clearable="true" :remote="true" @change="Change">
        <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
        </el-option>
    </el-select>
</template>
  
<script>
import {
    post
} from "@/utils/http";
import {
    Debounce,
    ReplaceImageHttp
} from "@/utils/index"
import store from "@/store";
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

        columnName: { //默认的列属性
            type: String, //默认的请求路径
            default: "",
        },
        columnValue: {
            type: String, //默认的请求路径
            default: "",
        },
        columnLabel: {
          type: String, //
          default: "",
        },
        where: {},
        disabled: {
            type: Boolean,
            default: false
        },


    },
    watch: {
        "value": {
            immediate: true, //该回调将会在侦听开始之后被立即调用
            handler: function (n, o) {

                if (n?.toString()?.length > 0) {

                    this.selectValue = n.toString();

                }
                else {
                    this.selectValue = n;
                }
            }
        }
    },
    data() {
        return {
            firstLoad_: true, //是否首次加载

            loading: false, //是否正在获取数据中
            options: [],
            where_: {},

            selectOption: {},
            selectValue: undefined,

        }
    },
    created() {


        if (this.$props.value?.toString()?.length > 0) {
            this.selectValue = this.$props.value.toString();

        }
        this.where_ = this.$props.where;

        this.FetchDataList();

    },
    methods: {

        InitData() {

            this.where_ = {};
        },
        async FetchDataList() {
            this.loading = true;
            let {
                Data: {
                    Items,

                }
            } = await post(this.$props.url, {
                ...this.where_
            });
            this.loading = false;
            let dataList = [];
            Items.forEach((item, index) => {
                dataList.push({
                    name: item[`${this.columnName}`],
                    value: item[`${this.columnValue}`]?.toString(),
                    label: item[`${this.columnLabel}`]?.toString(),
                });
            });
            this.options = dataList;
            console.log(this.options);
        },

        Change(value) {
            this.$emit('input', value);
        },

    }
}

</script>
  
  
  
