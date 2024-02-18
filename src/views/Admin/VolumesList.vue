<template>
    <div class="app-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-button type="primary" icon="el-icon-search" @click="TableSearch">搜 索</el-button>
                <el-button @click="Reset" icon="el-icon-delete">重 置</el-button>
            </div>
            <div class="tb-body">
                <el-form ref="searchFormRef" :model="searchForm" :inline="true" label-width="120px" :style="`flex:1;`">
                    <el-form-item label="优惠卷名称" prop="Name">
                        <el-input v-model.trim="searchForm.Name" placeholder="请输入优惠卷名称进行精确搜索"></el-input>
                    </el-form-item>
                    <el-form-item label="优惠金额">
                        <el-input-range :startValue.sync="searchForm.MoneyStartRange"
                            :endValue.sync="searchForm.MoneyEndRange"></el-input-range>
                    </el-form-item>
                    <el-form-item label="金额限制">
                        <el-input-range :startValue.sync="searchForm.MoneyConditionStartRange"
                            :endValue.sync="searchForm.MoneyConditionEndRange"></el-input-range>
                    </el-form-item>
                    <el-form-item label="数量">
                        <el-input-range :startValue.sync="searchForm.QtyStartRange"
                            :endValue.sync="searchForm.QtyEndRange"></el-input-range>
                    </el-form-item>
                    <el-form-item label="有效期开始时间">
                        <el-date-picker v-model="searchForm.BeginTimeRange" type="datetimerange"
                            start-placeholder="开始有效期开始时间" end-placeholder="结束有效期开始时间" :default-time="['00:00:00']"
                            value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="有效期结束时间">
                        <el-date-picker v-model="searchForm.EndTimeRange" type="datetimerange" start-placeholder="开始有效期结束时间"
                            end-placeholder="结束有效期结束时间" :default-time="['00:00:00']" value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </div>

        </el-card>


        <el-dialog title="优惠卷编辑对话框" :visible.sync="editorShow" width="80%" :lock-scroll="true" height="800px">
            <el-form v-if="editorShow == true" ref="editModalForm" :rules="editModalFormRules" :model="formData"
                label-width="140px" size="mini">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="优惠卷名称" prop="Name">
                            <el-input v-model.trim="formData.Name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="优惠卷封面" prop="Cover">
                            <el-upload-images :limit="1" v-model="formData.Cover"></el-upload-images>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="有效期开始时间" prop="BeginTime">
                            <el-date-picker v-model="formData.BeginTime" align="right" type="datetime"
                                placeholder="选择有效期开始时间时间" value-format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="有效期结束时间" prop="EndTime">
                            <el-date-picker v-model="formData.EndTime" align="right" type="datetime"
                                placeholder="选择有效期结束时间时间" value-format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="优惠金额" prop="Money">
                            <el-input v-model.trim="formData.Money"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="金额限制" prop="MoneyCondition">
                            <el-input v-model.trim="formData.MoneyCondition"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="数量" prop="Qty">
                            <el-input v-model.trim="formData.Qty"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="优惠内容" prop="Content">
                            <el-input v-model.trim="formData.Content"></el-input>
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


        <data-table ref="tableId" url="/Volumes/List" :column="dataColum">
            <template v-slot:header>
                <el-button type="primary" plain icon="el-icon-edit" @click="ShowEditModal()">新 增</el-button>
                <el-button type="danger" plain icon="el-icon-delete" @click="ShowBatchDeleteModal()">批 量 删 除</el-button>
            </template>
            <template v-slot:operate="scope">
                <el-button type="text" @click="ShowEditModal(scope.row.Id)">修 改</el-button>
                <el-button type="text" @click="ShowDeleteModal(scope.row.Id)">删 除</el-button>
            </template>
        </data-table>
    </div>
</template>
    
<script>
import store from '@/store';
import { mapGetters } from 'vuex'
export default {
    name: "VolumesList",
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
                    title: "优惠卷名称",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "Cover",
                    title: "优惠卷封面",
                    type: store.getters.columnType.IMAGES,
                },
                {
                    key: "Money",
                    title: "优惠金额",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "MoneyCondition",
                    title: "金额限制",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "Content",
                    title: "优惠内容",
                    type: store.getters.columnType.SHORTTEXT,

                },
                {
                    key: "Qty",
                    title: "数量",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "BeginTime",
                    title: "有效期开始时间",
                    type: store.getters.columnType.DATETIME,

                },
                {
                    key: "EndTime",
                    title: "有效期结束时间",
                    type: store.getters.columnType.DATETIME,

                },
                {
                    title: "操作",
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

                "Money": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "MoneyCondition": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "Content": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "Qty": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "BeginTime": [
                ],

                "EndTime": [
                ],

            },
            formData: {

            },//保存或者修改定义的数据对象
            editorShow: false,//编辑弹窗定义的数据对象

        };
    },
    created() {

    },
    methods: {
        /**
         * 点击新增或者编辑的时候会触发
         */
        async ShowEditModal(Id) {

            let { Data } = await this.$Post(`/Volumes/Get`, { Id: Id });
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
                    var { Success } = await this.$PostLoading(`/Volumes/CreateOrEdit`, this.formData);
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
            await this.$PostDelete(`/Volumes/Delete`, { Id: Id });
            this.$refs.tableId.reload();
        },
        /**
         * 批量删除的时候会触发
         */
        async ShowBatchDeleteModal() {
            var ids = this.$refs.tableId.GetSelectionRow().map(x => x.Id);
            await this.$PostDelete(`/Volumes/BatchDelete`, { Ids: ids });
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




    },
};
</script>
    