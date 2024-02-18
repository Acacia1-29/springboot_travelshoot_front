
<template>
    <div class="app-container">


        <data-table ref="tableId" url="/BuyCard/List" :column="dataColum" :where="{ UserId: userId }">
            <template v-slot:header>
                <el-button type="primary" plain icon="el-icon-edit" @click="ShowEditModal()">去 结 算</el-button>
                <el-button type="danger" plain icon="el-icon-delete" @click="ShowBatchDeleteModal()">批 量 移 除</el-button>
            </template>
            <template v-slot:operate="scope">
                <el-button type="text" @click="ShowDeleteModal(scope.row.Id)">移 除</el-button>
            </template>
        </data-table>
    </div>
</template>
    
<script>
import store from '@/store';
import { mapGetters } from 'vuex'
export default {
    name: "BuyCardList",
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
                    key: "GoodId",
                    hidden: true,
                },
                {
                    key: "GoodDto.Name",
                    title: "商品",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "GoodDto.Name",
                    title: "商品",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "GoodDto.Cover",
                    title: "封面",
                    type: store.getters.columnType.IMAGES,
                },
                {
                    key: "GoodDto.ImageUrls",
                    title: "图片",
                    type: store.getters.columnType.IMAGES,
                },
                {
                    key: "GoodDto.Content",
                    title: "详情介绍",
                    type: store.getters.columnType.RICHTEXT,

                },
                {
                    key: "GoodDto.Unit",
                    title: "单位",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "GoodDto.Price",
                    title: "价格",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "GoodDto.Stock",
                    title: "库存",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "UserId",
                    hidden: true,
                },
                {
                    title: "操作",
                    type: store.getters.columnType.USERDEFINED,
                },
            ],
            editModalFormRules: {
                "GoodId": [
                ],

                "UserId": [
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
        async ShowEditModal() {

            let row = this.$refs.tableId.GetSelectionRow();
            if (row.length == 0) {
                this.$message.info("请选择需要结算的商品");
            }
            var ids = this.$refs.tableId.GetSelectionRow().map(x => x.Id);
            await this.$PostLoading(`/BuyCard/BatchDelete`, { Ids: ids });
            this.$refs.tableId.reload();
            row.forEach((item) => {
                item.qty = 1;
            });

            localStorage.setItem("details", JSON.stringify(row.map(x => x.OrginValue)));
            this.$router.push({
                path: `/Client/ToOrder`, query: {

                }
            });


        },
        /**
         * 点击保存的时候会触发
         */
        async CreateOrEditForm() {
            if (this.lock == 1) return;
            this.$refs.editModalForm.validate(async valid => {
                if (valid) {
                    this.lock = 1;
                    var { Success } = await this.$PostLoading(`/BuyCard/CreateOrEdit`, this.formData);
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
            await this.$PostDelete(`/BuyCard/Delete`, { Id: Id });
            this.$refs.tableId.reload();
        },
        /**
         * 批量删除的时候会触发
         */
        async ShowBatchDeleteModal() {
            var ids = this.$refs.tableId.GetSelectionRow().map(x => x.Id);
            await this.$PostDelete(`/BuyCard/BatchDelete`, { Ids: ids });
            this.$refs.tableId.reload();
        },


    },
};
</script>
    
