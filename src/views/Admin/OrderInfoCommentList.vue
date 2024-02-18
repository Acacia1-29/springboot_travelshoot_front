<template>
    <div class="app-container">


        <el-dialog  title="订单评论编辑对话框" :visible.sync="editorShow" width="80%" :lock-scroll="true" height="800px">
            <el-form v-if="editorShow == true" ref="editModalForm" :rules="editModalFormRules" :model="formData"
                label-width="140px" size="mini">
                <el-row :gutter="10">
                </el-row>


                <el-row type="flex" justify="end" align="bottom">
                    <el-form-item>
                        <el-button type="primary" plain @click="CreateOrEditForm()">确 定</el-button>
                        <el-button @click="editorShow = false">取 消</el-button>
                    </el-form-item>
                </el-row>
            </el-form>

        </el-dialog>


        <data-table ref="tableId" url="/OrderInfoComment/List" :column="dataColum">
            <template v-slot:header>
 				 </template>
            <template v-slot:operate="scope">
            </template>
        </data-table>
    </div>
</template>
    
<script>
import store from '@/store';
import { mapGetters } from 'vuex'
export default {
    name: "OrderInfoCommentList",
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
                    title: "操作",
                  	  width:"300px", 
                    type: store.getters.columnType.USERDEFINED,
                },
            ],
            editModalFormRules: {
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

            let { Data } = await this.$Post(`/OrderInfoComment/Get`, { Id: Id });
            this.formData = Data;
            this.formData.Behavior=null;
            this.formData.IsEdit=Id!=undefined;
            
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
                    var { Success } = await this.$PostLoading(`/OrderInfoComment/CreateOrEdit`, this.formData);
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
            await this.$PostDelete(`/OrderInfoComment/Delete`, { Id: Id });
            this.$refs.tableId.reload();
        },
        /**
         * 批量删除的时候会触发
         */
        async ShowBatchDeleteModal() {
            var ids = this.$refs.tableId.GetSelectionRow().map(x => x.Id);
            await this.$PostDelete(`/OrderInfoComment/BatchDelete`, { Ids: ids });
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
    