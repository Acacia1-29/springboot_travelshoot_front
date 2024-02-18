
  <template>
    <div class="app-container">



        <el-dialog title="资讯收藏编辑对话框" :visible.sync="editorShow" width="80%" :lock-scroll="true" height="800px">
            <el-form v-if="editorShow == true" ref="editModalForm" :rules="editModalFormRules" :model="formData"
                label-width="140px" size="mini">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="收藏人" prop="CollectUserId">
                            <el-paged-select url="/User/List" columnName="Name" columnValue="Id"
                                v-model="formData.CollectUserId">
                            </el-paged-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="资讯" prop="ArticleInfoId">
                            <el-paged-select url="/ArticleInfo/List" columnName="Name" columnValue="Id"
                                v-model="formData.ArticleInfoId">
                            </el-paged-select>
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


        <data-table ref="tableId" url="/ArticleInfoCollect/List" :column="dataColum" :where="{ CollectUserId: userId }">
            <template v-slot:header>
            </template>
            <template v-slot:operate="scope">
                <el-button type="text" @click="Look(scope.row.ArticleInfoId)">浏 览</el-button>
                <el-button type="text" @click="ShowDeleteModal(scope.row.Id)">取 消 收 藏</el-button>
            </template>
        </data-table>
    </div>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex'
export default {
    name: "ArticleInfoCollectList",
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
                    key: "CollectUserId",
                    hidden: true,
                },
                {
                    key: "CollectUserDto.Name",
                    title: "收藏人",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    key: "ArticleInfoId",
                    hidden: true,
                },
                {
                    key: "ArticleInfoDto.Title",
                    title: "资讯",
                    type: store.getters.columnType.SHORTTEXT,
                },
                {
                    width: "300px",
                    title: "操作",
                    type: store.getters.columnType.USERDEFINED,
                },
            ],
            editModalFormRules: {
                "CollectUserId": [
                ],

                "ArticleInfoId": [
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
        async Look(Id) {
            this.$router.push({
                path: `/Client/ArticleInfo`, query: {
                    ArticleInfoId: Id,

                }
            });
        },
        /**
         * 点击新增或者编辑的时候会触发
         */
        async ShowEditModal(Id) {

            let { Data } = await this.$Post(`/ArticleInfoCollect/Get`, { Id: Id });
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
                    var { Success } = await this.$PostLoading(`/ArticleInfoCollect/CreateOrEdit`, this.formData);
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
            await this.$PostDelete(`/ArticleInfoCollect/Delete`, { Id: Id });
            this.$refs.tableId.reload();
        },




    },
};
</script>

