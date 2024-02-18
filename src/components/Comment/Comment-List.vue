
  
  
   
<template>
    <div style="margin: 10px 0px;">
        <div v-if="loading">
            <el-skeleton :rows="12" animated />
        </div>
        <div v-else>
            <el-empty v-if="options.length == 0" description="没有更多的数据啦~"></el-empty>
            <div v-else class="box">
                <div v-for="(item, index) in options" class="item">
                    <div>
                        <el-image style="width: 100px; height: 100px" :src="item.HeadImages" fit="cover"></el-image>
                    </div>
                    <div style="padding-left:20px;flex:1">
                        <div style="font-weight: bolder;font-size: 24px;">{{ item.Name }}</div>
                        <div class="cotent-warp">
                            <div class="content-cut">{{
                                item.Comment ||
                                '这个家伙什么也没留下' }}
                            </div>

                        </div>
                        <div style="margin:10px 0; float: right;color:rgb(75, 171, 219)">
                            <span style="padding-right: 20px;" @click="GoodComment(item)">好 评</span> <span
                                @click="LokeWholeCommentShow(item)">查看完整内容</span>
                        </div>
                    </div>
                    <div style="color:rgb(42, 88, 215)"><i class="el-icon-star-on"></i>{{ item.LikeCount || '0' }}</div>
                    <el-divider></el-divider>
                </div>

            </div>
        </div>

        <div class=" custom-pagination">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="pagination.page" :page-sizes="pagination.pageSizes" :page-size="pagination.limit"
                layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
            </el-pagination>
        </div>
        <h4>发表评论</h4>
        <el-form ref="editModalForm" :rules="editModalFormRules" :model="formData" label-width="140px" size="mini">
            <el-row :gutter="10">

                <el-col :span="24">
                    <el-form-item label="内容" prop="Comment">
                        <el-input type="textarea" :rows="7" placeholder="文明上网,构建和平社会!"
                            v-model.trim="formData.Comment"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row type="flex" justify="end" align="bottom">
                <el-form-item>
                    <el-button type="primary" plain @click="CreateOrEditForm()">发 表</el-button>

                </el-form-item>
            </el-row>
        </el-form>

        <el-dialog title="完整评论" :visible.sync="wholeCommentShow" width="70%" :lock-scroll="true"
            height="800px">
            <p>{{ WholeComment }}</p>
        </el-dialog>
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


        relativeId: {
            type: String, //
            default: "",
        },


        where: {},



    },
    watch: {

    },
    data() {
        return {
            wholeCommentShow: false,
            WholeComment: "",
            pagination: {
                limit: 10,
                page: 1,
                total: 0,
                pageSizes: [5, 10, 20, 50, 100, 200, 500, 1000],
            },
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
            editModalFormRules: {},
            formData: {},

        }
    },
    created() {
        this.where_ = this.$props.where;
        this.formData = {
            RelativeId: this.$props.relativeId,
            Name: store.getters.name,
            HeadImages: store.getters.avatar,
            LikeCount: 0
        };
        this.FetchDataList();

    },
    methods: {

        /**
         * 查看评论内容
         */
        LokeWholeCommentShow(item) {
            this.WholeComment = item.Comment;
            this.wholeCommentShow = true;
        },
        /**
         * 好评
         */
        async GoodComment(item) {
            let { Data } = await this.$Post(`/Comment/Get`, { Id: item.Id });
            if (Data.LikeCount == null) {
                Data.LikeCount = 1;
            }
            else {
                Data.LikeCount++;
            }
            let { Success } = await this.$PostLoading(`/Comment/CreateOrEdit`, Data);
            if (Success) {
                item.LikeCount = Data.LikeCount;
                this.$message.success("感谢你的好评!");
            }
        },
        /**
         * 点击保存的时候会触发
         */
        async CreateOrEditForm() {
            if (!this.$comm.CheckIsLogin()) {
                return;
            }
            if (this.lock == 1) return;
            this.$refs.editModalForm.validate(async valid => {
                if (valid) {
                    this.lock = 1;
                    var { Success } = await this.$PostLoading(`/Comment/CreateOrEdit`, this.formData);
                    this.lock = 0;
                    if (Success) {
                        this.formData.Comment = "";
                        this.Reload();
                    }
                }
            })
        },
        InitData() {
            this.pagination.limit = 30;
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
            } = await post("/Comment/List", {
                limit: this.pagination.limit,
                size: this.pagination.limit,
                page: this.pagination.page,
                ...this.where_,
                ...searchWhere
            });
            setTimeout(() => {
                this.loading = false;
            }, 1000);

            this.options = Items;
            this.pagination.total = TotalCount;
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

    }
}

</script>
<style scoped>
.item {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.cotent-warp {
    margin-top: 10px;
    padding: 20px;
    background-color: aliceblue;
    border-radius: 10px;
}

.content-cut {

    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;


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
  
  

  
  
