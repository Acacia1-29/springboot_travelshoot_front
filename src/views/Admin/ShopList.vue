<template>
    <div class="app-container">
        <el-card class="box-card">            
            <div slot="header" class="clearfix">
                <el-button type="primary" icon="el-icon-search" @click="TableSearch">搜 索</el-button>
                <el-button @click="Reset" icon="el-icon-delete">重 置</el-button>
            </div>
            <div class="tb-body">
                <el-form ref="searchFormRef" :model="searchForm" :inline="true" label-width="120px" :style="`flex:1;`">
                    <el-form-item label="店铺名称" prop="Name">
                        <el-input v-model.trim="searchForm.Name" placeholder="请输入店铺名称" ></el-input>
                    </el-form-item>
                    <el-form-item label="店铺地址" prop="Address">
                        <el-input v-model.trim="searchForm.Address" placeholder="请输入店铺地址" ></el-input>
                    </el-form-item>
                    <el-form-item label="店铺账号">
                        <el-paged-select url="/User/List" columnName="Name" columnValue="Id"
                            v-model="searchForm.ShopUserId">
                        </el-paged-select>
                    </el-form-item>                
                </el-form>
            </div>

        </el-card>


        <el-dialog  title="店铺编辑对话框" :visible.sync="editorShow" width="80%" :lock-scroll="true" height="800px">
            <el-form v-if="editorShow == true" ref="editModalForm" :rules="editModalFormRules" :model="formData"
                label-width="140px" size="mini">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="店铺名称" prop="Name">
                            <el-input v-model.trim="formData.Name"  ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="店铺封面" prop="Cover">
                           <el-upload-images :limit="1" v-model="formData.Cover"></el-upload-images>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="店铺地址" prop="Address">
                            <el-input v-model.trim="formData.Address"  ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="店铺账号" prop="ShopUserId">
                          <el-paged-select url="/User/List" columnName="Name" columnValue="Id"  v-model="formData.ShopUserId" >
                          </el-paged-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="店铺介绍" prop="Content">
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


        <data-table ref="tableId" url="/Shop/List" :column="dataColum">
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
    name: "ShopList",
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
                    title: "店铺名称",
                    type: store.getters.columnType.SHORTTEXT, 
                },
               {
                    key: "Cover",
                    title: "店铺封面",
                    type: store.getters.columnType.IMAGES,
                },
               {
                    key: "Address",
                    title: "店铺地址",
                    type: store.getters.columnType.SHORTTEXT, 
                },
               {
                    key: "ShopUserId",
                    hidden: true, 
                },
               {
                    key: "ShopUserDto.Name",
                    title: "店铺账号",
                    type: store.getters.columnType.SHORTTEXT, 
                },
               {
                    key: "Content",
                    title: "店铺介绍",
                    type: store.getters.columnType.RICHTEXT,

                },
                {
                    title: "操作",
                  	  width:"300px", 
                    type: store.getters.columnType.USERDEFINED,
                },
            ],
            editModalFormRules: {
              "Name":[
                { required: true, message: '该项为必填项', trigger: 'blur' },
              ],
              
              "Cover":[
                { required: true, message: '该项为必填项', trigger: 'blur' },
              ],
              
              "Address":[
                { required: true, message: '该项为必填项', trigger: 'blur' },
              ],
              
              "ShopUserId":[
              ],
              
              "Content":[
                { required: true, message: '该项为必填项', trigger: 'blur' },
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

            let { Data } = await this.$Post(`/Shop/Get`, { Id: Id });
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
                    var { Success } = await this.$PostLoading(`/Shop/CreateOrEdit`, this.formData);
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
            await this.$PostDelete(`/Shop/Delete`, { Id: Id });
            this.$refs.tableId.reload();
        },
        /**
         * 批量删除的时候会触发
         */
        async ShowBatchDeleteModal() {
            var ids = this.$refs.tableId.GetSelectionRow().map(x => x.Id);
            await this.$PostDelete(`/Shop/BatchDelete`, { Ids: ids });
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
    