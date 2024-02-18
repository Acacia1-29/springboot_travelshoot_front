
<template>
    <el-dialog title="修改密码" :visible.sync="editorShow" width="80%" append-to-body height="800px">
        <el-form v-if="formData != null" ref="editModalForm" :rules="editModalFormRules" :model="formData"
            label-width="80px" size="mini">
            <el-row :gutter="10">
                <el-form-item label="原始密码" prop="OrginPassword">
                    <el-input v-model.trim="formData.OrginPassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="Password">
                    <el-input v-model.trim="formData.Password"></el-input>
                </el-form-item>

                <el-form-item :span="12" label="重复密码" prop="Twopassword">
                    <el-input v-model.trim="formData.Twopassword"></el-input>
                </el-form-item>
            </el-row>

            <el-row type="flex" justify="end" align="bottom">
                <el-form-item>
                    <el-button type="primary" plain @click="SubmitForm()">确 定</el-button>
                    <el-button @click="editorShow = false">取 消</el-button>
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
            editorShow: false,
            editModalFormRules: {
                OrginPassword: [
                    { required: true, message: "请输入原始密码", trigger: "blur" },
                ],

                Password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
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
                    }
                ],
                Twopassword: [
                    { required: true, message: "请输入重复密码", trigger: "blur" },

                ],
            },
            formData: {
                OrginPassword: "",
                Password: "",
                Twopassword: ""
            },
        }
    },

    created() {

    },
    methods: {
        async ShowEditPasswordModal() {

            this.formData.OrginPassword = "";
            this.formData.Password = "";
            this.formData.Twopassword = "";
            this.editorShow = true;
        },
        async SubmitForm() {
            this.$refs.editModalForm.validate(async (valid) => {
                if (valid) {
                    let { Data: userInfo } = await this.$Post(`/User/Get`, { Id: this.userId });
                    if (this.formData.Password != this.formData.Twopassword) {
                        this.$message({
                            message: "两次输入的密码不一致",
                            type: "warning",
                        });
                        return;
                    }
                    if (this.formData.OrginPassword != userInfo.Password) {
                        this.$message({
                            message: "原始密码输入有误",
                            type: "warning",
                        });
                        return;
                    }

                    userInfo.Password = this.formData.Password;

                    let { Success } = await this.$Post("/User/CreateOrEdit", userInfo)

                    if (Success) {
                        this.editorShow = false;
                        await this.logout();
                    }
                }
            });
        },

        async logout() {
            await this.$store.dispatch("user/logout");
            this.$router.push(`/home/index`);
        },

    }
}

</script>

