
  
<template>
    <div class="app-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-button type="primary" icon="el-icon-search" @click="TableSearch">搜 索</el-button>
                <el-button @click="Reset" icon="el-icon-delete">重 置</el-button>
            </div>
            <div class="tb-body">
                <el-form ref="searchFormRef" :model="searchForm" :inline="true" label-width="120px" :style="`flex:1;`">
                    <el-form-item label="商品名称" prop="Name">
                        <el-input v-model.trim="searchForm.Name" placeholder="请输入商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="商品类型">
                        <el-paged-select url="/GoodType/List" columnName="Name" columnValue="Id"
                            v-model="searchForm.GoodTypeId">
                        </el-paged-select>
                    </el-form-item>
                    <el-form-item label="单位" prop="Unit">
                        <el-input v-model.trim="searchForm.Unit" placeholder="请输入单位"></el-input>
                    </el-form-item>
                    <el-form-item label="价格">
                        <el-input-range :startValue.sync="searchForm.PriceStartRange"
                            :endValue.sync="searchForm.PriceEndRange"></el-input-range>
                    </el-form-item>
                    <el-form-item label="库存">
                        <el-input-range :startValue.sync="searchForm.StockStartRange"
                            :endValue.sync="searchForm.StockEndRange"></el-input-range>
                    </el-form-item>

                </el-form>
            </div>

        </el-card>


        <el-dialog title="商品编辑" :visible.sync="editorShow" width="80%" :lock-scroll="true" height="800px">
            <el-form v-if="editorShow == true" ref="editModalForm" :rules="editModalFormRules" :model="formData"
                label-width="140px" size="mini">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="商品名称" prop="Name">
                            <el-input v-model.trim="formData.Name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品类型" prop="GoodTypeId">
                            <el-paged-select url="/GoodType/List" columnName="Name" columnValue="Id"
                                v-model="formData.GoodTypeId">
                            </el-paged-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="封面" prop="Cover">
                            <el-upload-images :limit="1" v-model="formData.Cover"></el-upload-images>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="主图" prop="ImageUrls">
                            <el-upload-images :limit="8" v-model="formData.ImageUrls"></el-upload-images>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单位" prop="Unit">
                            <el-input v-model.trim="formData.Unit"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="价格" prop="Price">
                            <el-input v-model.trim="formData.Price"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="库存" prop="Stock">
                            <el-input v-model.trim="formData.Stock"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否上架" prop="IsPutaway">
                            <el-switch v-model="formData.IsPutaway">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="详情介绍" prop="Content">
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

        <el-drawer title="自定义甜品属性" :visible.sync="detailShow" size="80%" direction="btt">

            <GoodPropsEditTable v-if="detailShow" ref="GoodPropsEditTableId" :GoodId="SelectGoodId"></GoodPropsEditTable>
        </el-drawer>
        <data-table ref="tableId" url="/Good/List" :column="dataColum">
            <template v-slot:header>
                <el-button type="primary" plain icon="el-icon-edit" @click="ShowEditModal()">新 增</el-button>
                <!-- <el-button type="danger" plain icon="el-icon-delete" @click="ShowBatchDeleteModal()">批 量 删 除</el-button> -->
            </template>
            <template v-slot:operate="scope">
                <el-button type="text" @click="ShowEditPropModal(scope.row.Id)">自 定 义 属 性</el-button>
                <el-button type="text" @click="ShowEditModal(scope.row.Id)">修 改</el-button>
                <el-button type="text" @click="ShowDeleteModal(scope.row.Id)">删 除</el-button>
            </template>
        </data-table>
    </div>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex'
import GoodPropsEditTable from "@/views/Admin/GoodPropsEditTable.vue"
export default {
    name: "GoodList",
    components: {
        GoodPropsEditTable
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
                    key: "Name",
                    title: "商品名称",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "GoodTypeDto.Name",
                    title: "商品类型",
                    type: store.getters.columnType.SHORTTEXT,
                },

                {
                    key: "Cover",
                    title: "封面",
                    type: store.getters.columnType.IMAGES,
                },
                {
                    key: "ImageUrls",
                    title: "图片",
                    type: store.getters.columnType.IMAGES,
                },
                {
                    key: "Content",
                    title: "详情介绍",
                    type: store.getters.columnType.RICHTEXT,

                },
                {
                    key: "Unit",
                    title: "单位",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "Price",
                    title: "价格",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "Stock",
                    title: "库存",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "IsPutaway",
                    title: "是否上架",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "GoodTypeId",
                    hidden: true,
                },
                {
                    title: "操作",
                    width: "300px",
                    type: store.getters.columnType.USERDEFINED,
                },
            ],
            editModalFormRules: {
                "Name": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "Cover": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "ImageUrls": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "Content": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "Unit": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "Price": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "Stock": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "IsPutaway": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "GoodTypeId": [
                ],

            },
            formData: {

            },//保存或者修改定义的数据对象
            editorShow: false,//编辑弹窗定义的数据对象
            detailShow: false,
            SelectGoodId: 0,

        };
    },
    created() {

    },
    methods: {
        async ShowEditPropModal(Id) {
            this.SelectGoodId = Id;
            this.detailShow = true;
        },
        /**
         * 点击新增或者编辑的时候会触发
         */
        async ShowEditModal(Id) {

            let { Data } = await this.$Post(`/Good/Get`, { Id: Id });
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
                    var { Success } = await this.$PostLoading(`/Good/CreateOrEdit`, this.formData);
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
            await this.$PostDelete(`/Good/Delete`, { Id: Id });
            this.$refs.tableId.reload();
        },
        /**
         * 批量删除的时候会触发
         */
        async ShowBatchDeleteModal() {
            var ids = this.$refs.tableId.GetSelectionRow().map(x => x.Id);
            await this.$PostDelete(`/Good/BatchDelete`, { Ids: ids });
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

