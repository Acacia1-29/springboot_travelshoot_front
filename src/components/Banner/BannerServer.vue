
  
  <template>
    <el-carousel type="card" indicator-position="outside">
        <el-carousel-item v-for="item in datalist" :key="item.id">
            <el-image :src="item.Url" fit="cover" ></el-image>
        </el-carousel-item>
    </el-carousel>
</template>
  
<script>
import { post } from "@/utils/http";
import { FormatDateTime, ReplaceImagesHttp, GetObjectValue } from "@/utils/index";
import store from "@/store";
import { mapGetters } from "vuex";
export default {
    name: "BannerServer",
    filters: {
        FormatDateTimefilter: (value) => FormatDateTime(value),
    },
    props: {
        value: {
            type: [Number, String],
            default: ''
        },
        url: {
            type: String, //默认的请求路径
            default: "",
        },
        where: {//搜索属性
            type: Object,
            default: () => { }
        },
        searchProp: { //搜索属性
            type: Object
        },
        BindLabel: {
            type: String,
            default: "",
        },
        BindUrl: {
            type: String,
            default: "",
        },
        BindToUrl: {
            type: String,
            default: "",
        },


    },
    computed: {
        ...mapGetters(['name', 'roleTypeFormat', 'avatar', 'loginTimePeriod', "user"]),
    },
    watch: {
        "value": {
            immediate: true, //该回调将会在侦听开始之后被立即调用
            handler: function (n, o) {

            }
        }
    },
    data() {
        return {

            datalist: [],
            where_: {},

        };
    },

    created() {
        this.where_ = this.$props.where;

        this.FetchDataList();
    },
    methods: {

        async FetchDataList(searchWhere = {}) {

            let { Data: { Items, TotalCount } } = await post(this.$props.url, {

                ...this.where_,
                ...searchWhere
            });
            let dataList = [];
            Items.forEach((item, index) => {
                let dataItem = {};
                dataItem[`Url`] = GetObjectValue(item, this.$props.BindUrl);
                dataItem[`Label`] = GetObjectValue(item, this.$props.BindLabel);
                dataItem[`ToUrl`] = GetObjectValue(item, this.$props.BindToUrl);
                dataList.push(dataItem);
            });
            console.log(dataList)
            this.datalist = dataList;


        },
    },
};
</script>
  
<style scoped>
.custom-pagination {
    margin-top: 20px;
    display: flex;
    flex-direction: row-reverse;
}

.tb-body {
    padding: 20px 0px;
}

.text-cut {

    white-space: nowrap;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
}

.table-box {
    background-color: white;

    margin-top: 20px;

}
</style>
   
  
  
