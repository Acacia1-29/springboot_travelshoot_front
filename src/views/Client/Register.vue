
  <template>
    <div class="page">
        <div class="login_l_img">
              <img src="@/assets/login/login-img.png" />
        </div>
        <el-form :rules="editModalFormRules" ref="loginForm" :model="formData" label-width="80px" class="loginContainer"
            label-position="right">
            <h3 class="loginTitle">
                注 册
            </h3>
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-form-item prop="UserName" label="用户名">
                        <el-input type="text" v-model="formData.UserName" placeholder="请输入用户名">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item prop="Name" label="姓名">
                        <el-input type="text" v-model="formData.Name" placeholder="请填写姓名">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item prop="Password" label="密码">
                        <el-input type="password" v-model="formData.Password" placeholder="请输入密码" show-password>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item prop="Twopassword" label="确认密码">
                        <el-input type="password" v-model="formData.Twopassword" placeholder="请输入二次密码" show-password>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="头像" prop="ImageUrls">
                        <el-upload-images :limit="1" v-model="formData.ImageUrls"></el-upload-images>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item prop="Code" label="验证码">
                        <el-input type="text" v-model="formData.Code" placeholder="请输入验证码">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item>
                        <div class="identifybox">
                            <div>
                                <el-code :identifyCode="identifyCode"></el-code>
                            </div>
                            <el-button @click="refreshCode" type='text' class="textbtn">看不清，换一张</el-button>
                        </div>
                    </el-form-item>
                </el-col>

            </el-row>

            <el-col :span="12">
                <el-form-item>
                    <el-button type="primary" style="width:100%" @click="handleRegister">注册</el-button>

                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item>
                    <el-button type="success" style="width:100%" @click="ToHome">首 页</el-button>

                </el-form-item>
            </el-col>

        </el-form>
    </div>
</template>

<script>
import router from '@/router';
import UploadImages from "@/components/upload/upload-images"
export default {
    components: {
        uploadImages: UploadImages
    },
    name: 'register',
    data() {
        const validateVerifycode = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入验证码'))
            } else if (value !== this.identifyCode) {
                callback(new Error('验证码不正确!'))
            } else {
                callback()
            }
        }
        return {
            lock: 0,
            identifyCode: '',
            identifyCodes: '1234567890abcdefghijklmnopqrstuvwxyz',
            formData: {
                UserName: '',
                Name: "",
                Password: '',
                Twopassword: "",
                ImageUrls: ""
            },
            editModalFormRules: {
                UserName: [
                    { required: true, trigger: 'blur', message: "请输入用户名", }

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
                Twopassword: [
                    { required: true, trigger: 'blur', message: "请输入二次密码", },
                ],

                Code: [{
                    required: true,
                    trigger: 'blur',
                    validator: validateVerifycode,
                }]
            },
            loading: false,
            passwordType: 'password',
            TwopasswordType: "password",

        }
    },
    mounted() {
        this.identifyCode = '';
        this.makeCode(this.identifyCodes, 4);

    },
    methods: {
        // 切换验证码
        refreshCode() {
            this.identifyCode = ''
            this.makeCode(this.identifyCodes, 4)
        },
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)]
            }

        },

        ToHome() {
            router.push({
                path: "/Client/Home"
            })
        },

        async handleRegister() {
            if (this.lock == 1) return;
            this.$refs.loginForm.validate(async valid => {
                if (valid) {
                    if (this.formData.Password != this.formData.Twopassword) {
                        this.$message({
                            message: '密码和确认密码不一致!',
                            type: 'error'
                        });
                        return;
                    }
                    this.lock = 1;
                    this.loading = true
                    this.formData.RoleType = 1;//普通
                    let { Data, Success } = await this.$Post(`/User/Register`, this.formData);

                    this.lock = 0;
                    if (Success) {
                        this.$message({
                            message: '恭喜你注册成功',
                            type: 'success'
                        });

                        setTimeout(() => {
                            this.loading = false;
                            this.Login();
                        }, 1000);
                    }

                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.loginContainer {

    border-radius: 15px;
    background-clip: padding-box;
    margin-left: 10%;
    width: 550px;
    padding: 15px 15px 15px 15px;
    background: aliceblue;
    border: 1px solid #065246;
    box-shadow: 0 0 25px #3355DA;

}

.loginTitle {
    margin: 0px auto 8px auto;
    text-align: center;
    font-size: 28px;
}

.loginRemember {
    text-align: left;
    margin: 0px 0px 15px 0px;
}

.page {
    height: 100vh;
    background-color: #3355DA;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

