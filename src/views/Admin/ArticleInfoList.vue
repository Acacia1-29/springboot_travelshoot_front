
  
<template>
    <div class="app-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-button type="primary" icon="el-icon-search" @click="TableSearch">搜 索</el-button>
                <el-button @click="Reset" icon="el-icon-delete">重 置</el-button>
            </div>
            <div class="tb-body">
                <el-form ref="searchFormRef" :model="searchForm" :inline="true" label-width="120px" :style="`flex:1;`">
                    <el-form-item label="发表者" prop="Author">
                        <el-input v-model.trim="searchForm.Author" placeholder="请输入发表者"></el-input>
                    </el-form-item>
                    <el-form-item label="资讯类型">
                        <el-paged-select url="/ArticleType/List" columnName="Title" columnValue="Id"
                            v-model="searchForm.ArticleTypeId">
                        </el-paged-select>
                    </el-form-item>
                    <el-form-item label="标题" prop="Title">
                        <el-input v-model.trim="searchForm.Title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                </el-form>
            </div>

        </el-card>


        <el-dialog title="资讯编辑对话框" :visible.sync="editorShow" width="80%" :lock-scroll="true" height="800px">
            <el-form v-if="editorShow == true" ref="editModalForm" :rules="editModalFormRules" :model="formData"
                label-width="140px" size="mini">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="标题" prop="Title">
                            <el-input v-model.trim="formData.Title"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="资讯类型" prop="ArticleTypeId">
                            <el-paged-select url="/ArticleType/List" columnName="Title" columnValue="Id"
                                v-model="formData.ArticleTypeId">
                            </el-paged-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="发表者" prop="Author">
                            <el-input v-model.trim="formData.Author"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="封面" prop="ImageUrls">
                            <el-upload-images :limit="1" v-model="formData.ImageUrls"></el-upload-images>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="上架状态" prop="IsPutaway">
                            <el-switch v-model="formData.IsPutaway">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否推荐" prop="IsRecommand">
                            <el-switch v-model="formData.IsRecommand">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="资讯内容" prop="Content">
                            <el-tinymce v-model="formData.Content" :height="300"></el-tinymce>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row type="flex" justify="end" align="bottom">
                    <el-form-item>
                        <el-button type="primary" plain @click="CreateOrEditForm()">确 定</el-button>
                        <el-button @click="editorShow = false">取 消</el-button>
                    </el-form-item>
                </el-row>
            </el-form>

        </el-dialog>


        <data-table ref="tableId" url="/ArticleInfo/List" :column="dataColum">
            <template v-slot:header>
                <el-button type="primary" plain icon="el-icon-edit" @click="ShowEditModal()">新 增</el-button>
                <el-button type="danger" plain icon="el-icon-delete" @click="ShowBatchDeleteModal()">批 量 删 除</el-button>
            </template>
            <template v-slot:operate="scope">
                <el-button type="text" @click="ShowCommentEditTable(scope.row)">查看评论</el-button>
                <el-button type="text" @click="ShowEditModal(scope.row.Id)">修 改</el-button>
                <el-button type="text" @click="ShowDeleteModal(scope.row.Id)">删 除</el-button>
            </template>
        </data-table>
        <el-drawer title="相关评论" :visible.sync="detailShow" size="80%" direction="btt">

            <ArticleInfoCommentEditTable v-if="detailShow" ref="ArticleInfoCommentEditTable"
                :ArticleInfoId="SelectArticleInfoId">
            </ArticleInfoCommentEditTable>
        </el-drawer>
    </div>
</template>

<script>
import ArticleInfoCommentEditTable from "@/views/Admin/ArticleInfoCommentEditTable.vue"
import store from '@/store';
import { mapGetters } from 'vuex'
export default {
    name: "ArticleInfoList",
    components: {
        ArticleInfoCommentEditTable
    },
    computed: {
        ...mapGetters([
            'name', 'roleTypeFormat', 'avatar', 'userId', 'loginTimePeriod', "user", 'userId', 'roleType'
        ])
    },
    data() {

        return {
            lock: 0,//用来防止重复提交的变量
            searchForm: {},//搜索定义的数据对象
            dataColum: [
                {
                    key: "Id",
                    hidden: true,

                },
                {
                    key: "Title",
                    title: "标题",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "ArticleTypeDto.Title",
                    title: "类型",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "ImageUrls",
                    title: "封面",
                    type: store.getters.columnType.IMAGES,
                },
                {
                    key: "Author",
                    title: "发表者",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "CollectCount",
                    title: "收藏数",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "CommentCount",
                    title: "评论数",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "LikeCount",
                    title: "点赞数",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "ArticleTypeId",
                    hidden: true,
                },
                {
                    key: "Content",
                    title: "资讯内容",
                    type: store.getters.columnType.RICHTEXT,

                },
                {
                    key: "IsRecommand",
                    title: "是否推荐",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "IsPutaway",
                    title: "上架状态",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    title: "操作",
                    type: store.getters.columnType.USERDEFINED,
                },
            ],
            editModalFormRules: {
                "Title": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "ArticleTypeId": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "Author": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "ImageUrls": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "IsPutaway": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "Content": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

            },
            formData: {

            },//保存或者修改定义的数据对象
            editorShow: false,//编辑弹窗定义的数据对象
            detailShow: false,
            SelectArticleInfoId: 0,
        };
    },
    created() {

    },
    methods: {
        async ShowCommentEditTable(row) {
            this.SelectArticleInfoId = row.Id;
            this.detailShow = true;
        },
        /**
         * 点击新增或者编辑的时候会触发
         */
        async ShowEditModal(Id) {

            let { Data } = await this.$Post(`/ArticleInfo/Get`, { Id: Id });
            this.formData = Data;
            this.formData.Behavior = null;
            this.formData.IsEdit = Id != undefined;

            this.editorShow = true;

        },
        /**
         * 点击保存的时候会触发
         */
        async CreateOrEditForm() {
            if (this.lock == 1) return;
            this.$refs.editModalForm.validate(async valid => {
                if (valid) {
                    this.lock = 1;
                    var { Success } = await this.$PostLoading(`/ArticleInfo/CreateOrEdit`, this.formData);
                    this.lock = 0;
                    if (Success) {
                        this.editorShow = false;
                        this.$refs.tableId.reload();
                    }
                }
            })
        },
        /**
         * 单个删除的时候会触发
         */
        async ShowDeleteModal(Id) {
            await this.$PostDelete(`/ArticleInfo/Delete`, { Id: Id });
            this.$refs.tableId.reload();
        },
        /**
         * 批量删除的时候会触发
         */
        async ShowBatchDeleteModal() {
            var ids = this.$refs.tableId.GetSelectionRow().map(x => x.Id);
            await this.$PostDelete(`/ArticleInfo/BatchDelete`, { Ids: ids });
            this.$refs.tableId.reload();
        },
        /**
         * 点击表格搜索按钮会触发
         */
        async TableSearch() {
            this.$refs.tableId.reload(this.searchForm);
        },
        /**
         * 点击清空表单会触发
         */
        async Reset() {
            this.searchForm = {};
            this.$refs.tableId.reload(this.searchForm);
        },

        /**
         * 导入成功
         */
        async ImportSuccess() {

            this.$refs.tableId.reload();
        },


    },
};
</script>



