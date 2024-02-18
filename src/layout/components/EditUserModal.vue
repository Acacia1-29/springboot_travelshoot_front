
  <template>
    <el-dialog title="修改用户信息" :visible.sync="editorUserShow" width="80%" append-to-body height="800px">
        <el-form v-if="userFormData != null" ref="editUserModalForm" :rules="editUserModalFormRules" :model="userFormData"
            label-width="80px" size="mini">
            <el-row :gutter="10">
                <el-form-item label="姓名" prop="Name">
                    <el-input v-model.trim="userFormData.Name"></el-input>
                </el-form-item>

                <el-form-item :span="12" label="邮箱" prop="Email">
                    <el-input v-model.trim="userFormData.Email"></el-input>
                </el-form-item>

                <el-form-item :span="12" label="电话号码" prop="PhoneNumber">
                    <el-input v-model.trim="userFormData.PhoneNumber"></el-input>
                </el-form-item>

                <el-form-item label="头像" prop="ImageUrls">
                    <el-upload-images :limit="1" v-model="userFormData.ImageUrls"></el-upload-images>


                </el-form-item>
            </el-row>

            <el-row type="flex" justify="end" align="bottom">
                <el-form-item>
                    <el-button type="primary" plain @click="SubmitUserForm()">确 定</el-button>
                    <el-button @click="editorUserShow = false">取 消</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<script>
import {
    post
} from "@/utils/http";
import {
    Debounce
} from "@/utils/index"
import store from "@/store";
import { mapGetters } from "vuex";
export default {

    props: {


    },
    watch: {

    },
    computed: {
        ...mapGetters(["theme", "userId"]),
    },

    data() {
        return {
            userFormData: {
            },
            editUserModalFormRules: {
                Name: [
                    { required: true, message: "请输入用户名称", trigger: "blur" },

                ],
                Email: [
                    { required: true, message: "请输入邮箱", trigger: "blur" },

                ],
            },
            editorUserShow: false,
        }
    },

    created() {

    },
    methods: {
        async ShowEditUserModal() {

            let { Data: UserInfo } = await this.$Post(`/User/Get`, { Id: this.userId });
            this.userFormData = UserInfo;
            this.editorUserShow = true;
        },
        async SubmitUserForm() {
            this.$refs.editUserModalForm.validate(async (valid) => {
                if (valid) {
                    let { Success } = await this.$Post("/User/CreateOrEdit", this.userFormData)
                    if (Success) {
                       await store.dispatch('user/GetByToken');
                        this.editorUserShow = false;

                    }
                }
            });
        },



    }
}

</script>

