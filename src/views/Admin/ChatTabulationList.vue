
  <template>
    <div class="app-container">
        <el-card class="box-card">            
            <div slot="header" class="clearfix">
                <el-button type="primary" icon="el-icon-search" @click="TableSearch">搜 索</el-button>
                <el-button @click="Reset" icon="el-icon-delete">重 置</el-button>
            </div>
            <div class="tb-body">
                <el-form ref="searchFormRef" :model="searchForm" :inline="true" label-width="120px" :style="`flex:1;`">
                    <el-form-item label="所属人">
                        <el-paged-select url="/User/List" columnName="Name" columnValue="Id"
                            v-model="searchForm.UserId">
                        </el-paged-select>
                    </el-form-item>                
                    <el-form-item label="好友">
                        <el-paged-select url="/User/List" columnName="Name" columnValue="Id"
                            v-model="searchForm.FriendUserId">
                        </el-paged-select>
                    </el-form-item>                
                    <el-form-item label="最后发送时间">
                        <el-date-picker v-model="searchForm.LastSendTimeRange" type="datetimerange" start-placeholder="开始最后发送时间"
                            end-placeholder="结束最后发送时间" :default-time="['00:00:00']" value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>                                       
                    </el-form-item>                
                    <el-form-item label="待读消息数">
                         <el-input-range :startValue.sync="searchForm.WaitReadMsgCountStartRange"  :endValue.sync="searchForm.WaitReadMsgCountEndRange"></el-input-range>                                      
                    </el-form-item>                
                    <el-form-item label="聊天类型">
                         <el-input-range :startValue.sync="searchForm.TypeStartRange"  :endValue.sync="searchForm.TypeEndRange"></el-input-range>                                      
                    </el-form-item>                
                </el-form>
            </div>

        </el-card>


        <el-dialog  title="聊天列表编辑对话框" :visible.sync="editorShow" width="80%" :lock-scroll="true" height="800px">
            <el-form v-if="editorShow == true" ref="editModalForm" :rules="editModalFormRules" :model="formData"
                label-width="140px" size="mini">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="所属人" prop="UserId">
                          <el-paged-select url="/User/List" columnName="Name" columnValue="Id"  v-model="formData.UserId" >
                          </el-paged-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="好友" prop="FriendUserId">
                          <el-paged-select url="/User/List" columnName="Name" columnValue="Id"  v-model="formData.FriendUserId" >
                          </el-paged-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="最新消息" prop="News">
                            <el-input v-model.trim="formData.News"  ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="最后发送时间" prop="LastSendTime">
                            <el-date-picker v-model="formData.LastSendTime" align="right" type="datetime" placeholder="选择最后发送时间时间" value-format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="待读消息数" prop="WaitReadMsgCount">
                            <el-input v-model.trim="formData.WaitReadMsgCount"  ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否删除" prop="IsDeleted">
                       		  <el-switch v-model="formData.IsDeleted" >
                            </el-switch>                          
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="聊天类型" prop="Type">
                            <el-input v-model.trim="formData.Type"  ></el-input>
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


        <data-table ref="tableId" url="/ChatTabulation/List" :column="dataColum">
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
    name: "ChatTabulationList",
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
                    key: "UserId",
                    hidden: true, 
                },
               {
                    key: "UserDto.Name",
                    title: "所属人",
                    type: store.getters.columnType.SHORTTEXT, 
                },
               {
                    key: "FriendUserId",
                    hidden: true, 
                },
               {
                    key: "FriendUserDto.Name",
                    title: "好友",
                    type: store.getters.columnType.SHORTTEXT, 
                },
               {
                    key: "News",
                    title: "最新消息",
                    type: store.getters.columnType.SHORTTEXT, 
                },
               {
                    key: "LastSendTime",
                    title: "最后发送时间",
                    type: store.getters.columnType.DATETIME,

                },
               {
                    key: "WaitReadMsgCount",
                    title: "待读消息数",
                    type: store.getters.columnType.SHORTTEXT, 
                },
               {
                    key: "IsDeleted",
                    title: "是否删除",
                    type: store.getters.columnType.SHORTTEXT, 
                },
               {
                    key: "Type",
                    title: "聊天类型",
                    type: store.getters.columnType.SHORTTEXT, 
                },
                {
                    title: "操作",
                    type: store.getters.columnType.USERDEFINED,
                },
            ],
            editModalFormRules: {
              "UserId":[
              ],
              
              "FriendUserId":[
              ],
              
              "News":[
                { required: true, message: '该项为必填项', trigger: 'blur' },
              ],
              
              "LastSendTime":[
              ],
              
              "WaitReadMsgCount":[
                { required: true, message: '该项为必填项', trigger: 'blur' },
              ],
              
              "IsDeleted":[
                { required: true, message: '该项为必填项', trigger: 'blur' },
              ],
              
              "Type":[
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

            let { Data } = await this.$Post(`/ChatTabulation/Get`, { Id: Id });
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
                    var { Success } = await this.$PostLoading(`/ChatTabulation/CreateOrEdit`, this.formData);
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
            await this.$PostDelete(`/ChatTabulation/Delete`, { Id: Id });
            this.$refs.tableId.reload();
        },
        /**
         * 批量删除的时候会触发
         */
        async ShowBatchDeleteModal() {
            var ids = this.$refs.tableId.GetSelectionRow().map(x => x.Id);
            await this.$PostDelete(`/ChatTabulation/BatchDelete`, { Ids: ids });
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
    
