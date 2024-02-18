<template>
    <div class="app-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-button type="primary" icon="el-icon-search" @click="TableSearch">搜 索</el-button>
                <el-button @click="Reset" icon="el-icon-delete">重 置</el-button>
            </div>
            <div class="tb-body">
                <el-form ref="searchFormRef" :model="searchForm" :inline="true" label-width="120px" :style="`flex:1;`">

                    <el-form-item label="使用时间">
                        <el-date-picker v-model="searchForm.UseTimeRange" type="datetimerange" start-placeholder="开始使用时间"
                            end-placeholder="结束使用时间" :default-time="['00:00:00']" value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </el-form-item>

                </el-form>
            </div>

        </el-card>


        <data-table ref="tableId" url="/VolumeRecord/List" :column="dataColum" :where="{ UserId: userId }">

        </data-table>
    </div>
</template>
    
<script>
import store from '@/store';
import { mapGetters } from 'vuex'
export default {
    name: "VolumeRecordList",
    computed: {
        ...mapGetters([
            'name', 'roleTypeFormat', 'avatar', 'userId', 'loginTimePeriod', "user", 'roleType'
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
                    key: "VolumensId",
                    hidden: true,
                },
                {
                    key: "VolumensDto.Name",
                    title: "优惠卷",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "VolumensDto.BeginTime",
                    title: "开始时间",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "VolumensDto.EndTime",
                    title: "失效时间",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "VolumensDto.Money",
                    title: "优惠金额",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "VolumensDto.MoneyCondition",
                    title: "优惠卷使用条件",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "UserId",
                    hidden: true,
                },
                {
                    key: "UserDto.Name",
                    title: "领取人",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "IsUse",
                    title: "是否使用",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "UseTime",
                    title: "使用时间",
                    type: store.getters.columnType.DATETIME,

                },
                {
                    key: "OrderId",
                    hidden: true,
                },
                {
                    key: "OrderDto.Code",
                    title: "所属订单",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    title: "操作",
                    type: store.getters.columnType.USERDEFINED,
                },
            ],
            editModalFormRules: {
                "VolumensId": [
                ],

                "UserId": [
                ],

                "IsUse": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "UseTime": [
                ],

                "OrderId": [
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

            let { Data } = await this.$Post(`/VolumeRecord/Get`, { Id: Id });
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
                    var { Success } = await this.$PostLoading(`/VolumeRecord/CreateOrEdit`, this.formData);
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
            await this.$PostDelete(`/VolumeRecord/Delete`, { Id: Id });
            this.$refs.tableId.reload();
        },
        /**
         * 批量删除的时候会触发
         */
        async ShowBatchDeleteModal() {
            var ids = this.$refs.tableId.GetSelectionRow().map(x => x.Id);
            await this.$PostDelete(`/VolumeRecord/BatchDelete`, { Ids: ids });
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
    