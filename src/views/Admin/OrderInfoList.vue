
  
<template>
    <div class="app-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-button type="primary" icon="el-icon-search" @click="TableSearch">搜 索</el-button>
                <el-button @click="Reset" icon="el-icon-delete">重 置</el-button>
            </div>
            <div class="tb-body">
                <el-form ref="searchFormRef" :model="searchForm" :inline="true" label-width="120px" :style="`flex:1;`">
                    <el-form-item label="订单编号" prop="Code">
                        <el-input v-model.trim="searchForm.Code" placeholder="请输入订单编号"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" prop="LinkName">
                        <el-input v-model.trim="searchForm.LinkName" placeholder="请输入联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="Phone">
                        <el-input v-model.trim="searchForm.Phone" placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="Address">
                        <el-input v-model.trim="searchForm.Address" placeholder="请输入地址"></el-input>
                    </el-form-item>
                    <el-form-item label="购买人">
                        <el-paged-select url="/User/List" columnName="Name" columnValue="Id" v-model="searchForm.BuyUserId">
                        </el-paged-select>
                    </el-form-item>
                    <el-form-item label="备注" prop="Remark">
                        <el-input v-model.trim="searchForm.Remark" placeholder="请输入备注"></el-input>
                    </el-form-item>
                    <el-form-item label="物流单号" prop="LogisticsNo">
                        <el-input v-model.trim="searchForm.LogisticsNo" placeholder="请输入物流单号"></el-input>
                    </el-form-item>
                    <el-form-item label="订单状态">
                        <el-paged-select url="/Select/OrderStatus" columnName="Name" columnValue="Value"
                            v-model="searchForm.OrderStatus">
                        </el-paged-select>
                    </el-form-item>
                    <el-form-item label="支付方式" prop="PayType">
                        <el-input v-model.trim="searchForm.PayType" placeholder="请输入支付方式"></el-input>
                    </el-form-item>
                </el-form>
            </div>

        </el-card>


        <el-dialog title="发货商品" :visible.sync="editorShow" width="80%" :lock-scroll="true" height="800px">
            <el-form v-if="editorShow == true" ref="editModalForm" :rules="editModalFormRules" :model="formData"
                label-width="140px" size="mini">
                <el-row :gutter="10">

                    <el-col :span="24">
                        <el-form-item label="物流单号" prop="LogisticsNo">
                            <el-input v-model.trim="formData.LogisticsNo"></el-input>
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


        <data-table ref="tableId" url="/OrderInfo/List" :column="dataColum">
            <template v-slot:header>

                <el-export-button :where="searchForm" exportUrl="/OrderInfo/Export"></el-export-button>
            </template>
            <template v-slot:operate="scope">
                <el-button type="text" @click="Look(scope.row.Id)">查 看 明 细</el-button>
                <el-button type="text" v-if="scope.row.OrderStatus == 1" @click="Send(scope.row.Id)">发 货</el-button>

                <el-button type="text" v-if="scope.row.OrderStatus == 1" @click="ShowDeleteModal(scope.row.Id)">删
                    除</el-button>
            </template>
        </data-table>

        <el-drawer title="订单明细" :visible.sync="detailShow" size="80%" direction="btt">
            <data-table ref="detailtableId" url="/OrderDetail/List" :column="dataDetailColum"
                :where="{ OrderInfoId: SelectOrderId }">


            </data-table>
        </el-drawer>
    </div>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex'
export default {
    name: "OrderInfoList",
    computed: {
        ...mapGetters([
            'name', 'roleTypeFormat', 'avatar', 'userId', 'loginTimePeriod', "user", 'userId', 'roleType'
        ])
    },
    components: {

    },
    data() {

        return {
            lock: 0,//用来防止重复提交的变量
            detailShow: false,
            SelectOrderId: undefined,
            searchForm: {},//搜索定义的数据对象
            dataColum: [
                {
                    key: "Id",
                    hidden: true,

                },
                {
                    key: "OrderStatus",
                    hidden: true,
                },
                {
                    key: "Code",
                    title: "订单编号",
                    type: store.getters.columnType.SHORTTEXT,
                },

                {
                    key: "BuyUserDto.UserName",
                    title: "下单账号",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "LinkName",
                    title: "联系人",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "Phone",
                    title: "联系电话",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "Address",
                    title: "地址",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "BuyUserId",
                    hidden: true,
                },
                {
                    key: "TotalMoney",
                    title: "总金额",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "Remark",
                    title: "备注",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "LogisticsNo",
                    title: "物流单号",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "OrderStatusFormat",
                    title: "订单状态",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "Comment",
                    title: "订单评价",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "PayType",
                    title: "支付方式",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    title: "操作",
                    width: "300px",
                    type: store.getters.columnType.USERDEFINED,
                },
            ],
            editModalFormRules: {
                "Code": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "LinkName": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "Phone": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "Address": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "BuyUserId": [
                ],

                "Remark": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "LogisticsNo": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "Comment": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "PayType": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

            },
            formData: {

            },//保存或者修改定义的数据对象
            editorShow: false,//编辑弹窗定义的数据对象

            dataDetailColum: [
                {
                    key: "Id",
                    hidden: true,

                },
                {
                    key: "GoodId",
                    hidden: true,
                },
                {
                    key: "GoodName",
                    title: "商品名称",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "GoodImageUrls",
                    title: "商品图片",
                    type: store.getters.columnType.IMAGES,
                },
                {
                    key: "Price",
                    title: "单价",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "Number",
                    title: "数量",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "OrderInfoId",
                    hidden: true,
                },

            ],

        };
    },
    created() {

    },
    methods: {
        async Look(Id) {
            this.detailShow = true;
            this.SelectOrderId = Id;
            this.$refs.detailtableId.reload();
        },
        /**
         * 点击新增或者编辑的时候会触发
         */
        async Send(Id) {

            let { Data } = await this.$Post(`/OrderInfo/Get`, { Id: Id });
            this.formData = Data;
            this.formData.Behavior = null;
            this.formData.IsEdit = Id != undefined;
            this.formData.OrderStatus = 2;
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
                    var { Success } = await this.$PostLoading(`/OrderInfo/CreateOrEdit`, this.formData);
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
            await this.$PostDelete(`/OrderInfo/Delete`, { Id: Id });
            this.$refs.tableId.reload();
        },
        /**
         * 批量删除的时候会触发
         */
        async ShowBatchDeleteModal() {
            var ids = this.$refs.tableId.GetSelectionRow().map(x => x.Id);
            await this.$PostDelete(`/OrderInfo/BatchDelete`, { Ids: ids });
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


