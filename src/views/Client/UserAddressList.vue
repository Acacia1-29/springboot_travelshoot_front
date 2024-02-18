
  <template>
    <div class="app-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-button type="primary" icon="el-icon-search" @click="TableSearch">搜 索</el-button>
                <el-button @click="Reset" icon="el-icon-delete">重 置</el-button>
            </div>
            <div class="tb-body">
                <el-form ref="searchFormRef" :model="searchForm" :inline="true" label-width="120px" :style="`flex:1;`">
                    <el-form-item label="省" prop="Privoce">
                        <el-input v-model.trim="searchForm.Privoce" placeholder="请输入省进行精确搜索"></el-input>
                    </el-form-item>
                    <el-form-item label="城" prop="City">
                        <el-input v-model.trim="searchForm.City" placeholder="请输入城进行精确搜索"></el-input>
                    </el-form-item>
                    <el-form-item label="区" prop="Zoom">
                        <el-input v-model.trim="searchForm.Zoom" placeholder="请输入区进行精确搜索"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="Address">
                        <el-input v-model.trim="searchForm.Address" placeholder="请输入详细地址进行精确搜索"></el-input>
                    </el-form-item>
                    <el-form-item label="收货人" prop="LinkName">
                        <el-input v-model.trim="searchForm.LinkName" placeholder="请输入收货人进行精确搜索"></el-input>
                    </el-form-item>
                    <el-form-item label="收货电话" prop="Phone">
                        <el-input v-model.trim="searchForm.Phone" placeholder="请输入收货电话进行精确搜索"></el-input>
                    </el-form-item>

                </el-form>
            </div>

        </el-card>


        <el-dialog title="用户地址编辑对话框" :visible.sync="editorShow" width="80%" :lock-scroll="true" height="800px">
            <el-form v-if="editorShow == true" ref="editModalForm" :rules="editModalFormRules" :model="formData"
                label-width="140px" size="mini">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="省" prop="Privoce">
                            <el-input v-model.trim="formData.Privoce"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="城" prop="City">
                            <el-input v-model.trim="formData.City"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="区" prop="Zoom">
                            <el-input v-model.trim="formData.Zoom"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="详细地址" prop="Address">
                            <el-input v-model.trim="formData.Address"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="收货人" prop="LinkName">
                            <el-input v-model.trim="formData.LinkName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="收货电话" prop="Phone">
                            <el-input v-model.trim="formData.Phone"></el-input>
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


        <data-table ref="tableId" url="/UserAddress/List" :column="dataColum" :where="{ UserId: userId }">
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
    name: "UserAddressList",
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
                    key: "Privoce",
                    title: "省",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "City",
                    title: "城",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "Zoom",
                    title: "区",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "Address",
                    title: "详细地址",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "LinkName",
                    title: "收货人",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "Phone",
                    title: "收货电话",
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
                "Privoce": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "City": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "Zoom": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "Address": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "LinkName": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
                ],

                "Phone": [
                    { required: true, message: '该项为必填项', trigger: 'blur' },
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
        async ShowEditModal(Id) {

            let { Data } = await this.$Post(`/UserAddress/Get`, { Id: Id });
            this.formData = Data;
            this.formData.Behavior = null;
            this.formData.IsEdit = Id != undefined;
            this.formData.UserId = this.userId;
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
                    var { Success } = await this.$PostLoading(`/UserAddress/CreateOrEdit`, this.formData);
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
            await this.$PostDelete(`/UserAddress/Delete`, { Id: Id });
            this.$refs.tableId.reload();
        },
        /**
         * 批量删除的时候会触发
         */
        async ShowBatchDeleteModal() {
            var ids = this.$refs.tableId.GetSelectionRow().map(x => x.Id);
            await this.$PostDelete(`/UserAddress/BatchDelete`, { Ids: ids });
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
    
  
