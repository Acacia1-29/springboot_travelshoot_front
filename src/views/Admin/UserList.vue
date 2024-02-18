
  <template>
    <div class="app-container">

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-button type="primary" icon="el-icon-search" @click="TableSearch">搜 索</el-button>
                <el-button @click="Reset" icon="el-icon-delete">重 置</el-button>
            </div>
            <div class="tb-body">
                <el-form ref="searchFormRef" :model="searchForm" :inline="true" label-width="100px" :style="`flex:1;`">
                    <el-form-item label="姓名" prop="Name">
                        <el-input v-model.trim="searchForm.Name"></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱" prop="Email">
                        <el-input v-model.trim="searchForm.Email"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="PhoneNumber">
                        <el-input v-model.trim="searchForm.PhoneNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="出生日期" prop="BirthRange">
                        <el-date-picker v-model="searchForm.BirthRange" type="datetimerange" start-placeholder="开始出生日期"
                            end-placeholder="结束出生日期" :default-time="['00:00:00']" value-format="yyyy-MM-dd HH:mm:ss ">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="角色">
                        <el-paged-select url="/Select/RoleType" columnName="Name" columnValue="Value"
                            v-model="searchForm.RoleType">
                        </el-paged-select>
                    </el-form-item>


                </el-form>
            </div>

        </el-card>


        <el-dialog title="编辑" :visible.sync="editorShow" width="80%" :lock-scroll="true" min-height="800px">
            <el-form v-if="editorShow == true" ref="editModalForm" :rules="editModalFormRules" :model="formData"
                label-width="140px" size="mini">

                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="账号" prop="UserName">
                            <el-input v-model.trim="formData.UserName" :disabled='formData.Id != null'></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="12">
                        <el-form-item label="密码" prop="Password">
                            <el-input type="password" v-model.trim="formData.Password"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="角色">
                            <el-paged-select url="/Select/RoleType" columnName="Name" columnValue="Value"
                                v-model="formData.RoleType">
                            </el-paged-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮箱" prop="Email">
                            <el-input v-model.trim="formData.Email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系方式" prop="PhoneNumber">
                            <el-input v-model.trim="formData.PhoneNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="出生时间" prop="Birth">
                            <el-date-picker v-model="formData.Birth" align="right" type="date" placeholder="选择出生时间"
                                value-format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="详细家庭地址" prop="Address">
                            <el-input v-model.trim="formData.Address"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="姓名" prop="Name">
                            <el-input v-model.trim="formData.Name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="图片" prop="ImageUrls">
                            <el-upload-images :limit="1" v-model="formData.ImageUrls"></el-upload-images>
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




        <data-table ref="tableId" url="/User/List" :column="dataColum">
            <template v-slot:header>
                <el-button type="primary" plain icon="el-icon-edit" @click="ShowEditModal()">新 增</el-button>
                <el-button type="danger" plain icon="el-icon-delete" @click="ShowBatchDeleteModal()">批 量 删 除</el-button>
                <!-- <el-import-button templeteUrl="/Templete/AppUser.xlsx" uploadUrl="/User/Import"
                    @ButtonImportSuccess="ImportSuccess"></el-import-button> -->
                <el-export-button :where="searchForm" exportUrl="/User/Export"></el-export-button>
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

export default {
    name: "UserList",
    data() {

        return {
            lock: 0,
            searchForm: {},
            dataColum: [
                {
                    key: "Id",
                    hidden: true,

                },
                {
                    key: "UserName",
                    title: "账号",
                    type: store.getters.columnType.SHORTTEXT,

                },

                {
                    key: "Email",
                    title: "邮箱",
                    type: store.getters.columnType.SHORTTEXT,

                },
                {
                    key: "ImageUrls",
                    title: "图片",
                    type: store.getters.columnType.IMAGES,

                },
                {
                    key: "Name",
                    title: "姓名",
                    type: store.getters.columnType.SHORTTEXT,

                },

                {
                    key: "PhoneNumber",
                    title: "手机号",
                    type: store.getters.columnType.PHONE,

                },
                {
                    key: "Birth",
                    title: "出生年月",
                    type: store.getters.columnType.DATE,

                },
                {
                    key: "Address",
                    title: "详细家庭地址",
                    type: store.getters.columnType.PHONE,

                },
                {
                    key: "RoleTypeFormat",
                    title: "所属角色",
                    type: store.getters.columnType.SHORTTEXT,

                },

                {
                    title: "操作",
                    type: store.getters.columnType.USERDEFINED,
                },
            ],
            editModalFormRules: {
                "Email": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                    {

                        validator: (rule, value, callback) => {
                            var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;
                            if (!value || !reg.test(value)) {
                                callback(new Error('请输入正确的邮箱!'));
                            }
                            else {
                                callback();
                            }
                        }, trigger: 'blur'
                    }
                ],
                "Password": [{ required: true, message: '该项为必填项', trigger: 'blur' },
                {

                    validator: (rule, value, callback) => {
                        var reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                        if (!value || !reg.test(value)) {
                            callback(new Error('密码至少包含一个字母和一个数字，且长度至少为8个字符!'));
                        }
                        else {
                            callback();
                        }
                    }, trigger: 'blur'
                }],
                "Name": [{ required: true, message: '该项为必填项', trigger: 'blur' },
                {

                    validator: (rule, value, callback) => {
                        var reg = /^[\u4e00-\u9fa5]{1,5}$/;
                        if (!value || !reg.test(value)) {
                            callback(new Error('请输入正确的姓名'));
                        }
                        else {
                            callback();
                        }
                    }, trigger: 'blur'
                }],
                "PhoneNumber": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                    {

                        validator: (rule, value, callback) => {
                            var reg = /^1[3-9]\d{9}$/;
                            if (!value || !reg.test(value)) {
                                callback(new Error('请输入正确的手机号码!'));
                            }
                            else {
                                callback();
                            }
                        }, trigger: 'blur'
                    }
                ],
            },
            formData: {

            },
            editorShow: false,

        };
    },
    created() {

    },
    methods: {
        /**
         * 点击新增或者编辑的时候会触发
         */
        async ShowEditModal(Id) {

            let { Data } = await this.$Post(`/User/Get`, { Id: Id });
            this.formData = Data;
         
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
                  
                    var { Success } = await this.$PostLoading(`/User/CreateOrEdit`, this.formData);
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
            await this.$PostDelete(`/User/Delete`, { Id: Id });
            this.$refs.tableId.reload();
        },
        /**
         * 批量删除的时候会触发
         */
        async ShowBatchDeleteModal() {
            var ids = this.$refs.tableId.GetSelectionRow().map(x => x.Id);
            await this.$PostDelete(`/User/BatchDelete`, { Ids: ids });
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

