
  <template>
    <div class="app-container">
        <el-card class="box-card">            
            <div slot="header" class="clearfix">
                <el-button type="primary" icon="el-icon-search" @click="TableSearch">搜 索</el-button>
                <el-button @click="Reset" icon="el-icon-delete">重 置</el-button>
            </div>
            <div class="tb-body">
                <el-form ref="searchFormRef" :model="searchForm" :inline="true" label-width="120px" :style="`flex:1;`">
                    <el-form-item label="发送人">
                        <el-paged-select url="/User/List" columnName="Name" columnValue="Id"
                            v-model="searchForm.SendUserId">
                        </el-paged-select>
                    </el-form-item>                
                    <el-form-item label="接受人">
                        <el-paged-select url="/User/List" columnName="Name" columnValue="Id"
                            v-model="searchForm.ReceiveUserId">
                        </el-paged-select>
                    </el-form-item>                
                </el-form>
            </div>

        </el-card>


        <el-dialog  title="聊天记录编辑对话框" :visible.sync="editorShow" width="80%" :lock-scroll="true" height="800px">
            <el-form v-if="editorShow == true" ref="editModalForm" :rules="editModalFormRules" :model="formData"
                label-width="140px" size="mini">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="发送人" prop="SendUserId">
                          <el-paged-select url="/User/List" columnName="Name" columnValue="Id"  v-model="formData.SendUserId" >
                          </el-paged-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="接受人" prop="ReceiveUserId">
                          <el-paged-select url="/User/List" columnName="Name" columnValue="Id"  v-model="formData.ReceiveUserId" >
                          </el-paged-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="内容" prop="Content">
                             <el-tinymce v-model="formData.Content" :height="300"></el-tinymce>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否已读" prop="IsAllRead">
                       		  <el-switch v-model="formData.IsAllRead" >
                            </el-switch>                          
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


        <data-table ref="tableId" url="/ChatRecord/List" :column="dataColum">
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
    name: "ChatRecordList",
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
                    key: "SendUserId",
                    hidden: true, 
                },
               {
                    key: "SendUserDto.Name",
                    title: "发送人",
                    type: store.getters.columnType.SHORTTEXT, 
                },
               {
                    key: "ReceiveUserId",
                    hidden: true, 
                },
               {
                    key: "ReceiveUserDto.Name",
                    title: "接受人",
                    type: store.getters.columnType.SHORTTEXT, 
                },
               {
                    key: "Content",
                    title: "内容",
                    type: store.getters.columnType.RICHTEXT,

                },
               {
                    key: "IsAllRead",
                    title: "是否已读",
                    type: store.getters.columnType.SHORTTEXT, 
                },
                {
                    title: "操作",
                    type: store.getters.columnType.USERDEFINED,
                },
            ],
            editModalFormRules: {
              "SendUserId":[
              ],
              
              "ReceiveUserId":[
              ],
              
              "Content":[
                { required: true, message: '该项为必填项', trigger: 'blur' },
              ],
              
              "IsAllRead":[
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

            let { Data } = await this.$Post(`/ChatRecord/Get`, { Id: Id });
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
                    var { Success } = await this.$PostLoading(`/ChatRecord/CreateOrEdit`, this.formData);
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
            await this.$PostDelete(`/ChatRecord/Delete`, { Id: Id });
            this.$refs.tableId.reload();
        },
        /**
         * 批量删除的时候会触发
         */
        async ShowBatchDeleteModal() {
            var ids = this.$refs.tableId.GetSelectionRow().map(x => x.Id);
            await this.$PostDelete(`/ChatRecord/BatchDelete`, { Ids: ids });
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
    
