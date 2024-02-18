
<template>
  <div class="page">

    <div class="login_l_img">
      <img src="@/assets/login/login-img.png" />
    </div>
    <el-form :rules="loginRules" ref="loginForm" :model="loginForm" class="loginContainer">
      <h3 class="loginTitle">
        登录
      </h3>
           <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item prop="userName" label="账号">
            <el-input type="text" v-model="loginForm.userName" placeholder="请输入账号">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="loginForm.password" placeholder="亲，请输入密码">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="name">
            <el-radio-group v-model="loginForm.roleType">
              <el-radio v-for="(item, index)  in RoleTypes" :label="item.Value"> {{ item.Name }} </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="code">
            <el-input type="text" v-model="loginForm.code" placeholder="请输入验证码">
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
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" style="width:100%" @click="handleLogin">登录</el-button>

          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import router from '@/router';
export default {
  name: 'Login',
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
      identifyCode: '',
      identifyCodes: '1234567890',
      loginForm: {
        userName: '',
        password: '',
        roleType: '0'
      },
      RoleTypes: [],
      loginRules: {
        userName: [{ required: true, trigger: 'blur', message: "请输入用户名" }],
        password: [{ required: true, trigger: 'blur', message: "请输入密码", }],
        code: [{
          required: true,
          trigger: 'blur',
          validator: validateVerifycode,
        }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    this.identifyCode = '';
    this.makeCode(this.identifyCodes, 4);
    this.GetRoleTypes();
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
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async GetRoleTypes() {
      let { Data: { Items } } = await this.$Post(`/Select/RoleType`, {});

      this.RoleTypes = Items;
    },
    Register() {

      router.push({
        path: "/register"
      })

    },
    toHome() {
      this.$router.push({
        path: "/Client/Home"
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            if (res) {
              if (this.loginForm.roleType == 0 || this.loginForm.roleType == 1) {
                this.$router.push({
                  path: "/"
                })
              }
              else {

                this.$router.push({
                  path: "/Client/Home"
                })
              }
            }
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.page {
  background-size: 100%;
}

.loginContainer {

  border-radius: 15px;
  background-clip: padding-box;
  margin-left: 100px;
  width: 25%;
  padding: 15px 35px 15px 35px;
  background: rgb(253, 253, 253);
  border: 1px solid #93defe;
  box-shadow: 0 0 25px #93defe;

}

.loginTitle {
  margin: 0px auto 48px auto;
  text-align: center;
  font-size: 40px;
}

.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}

.page {
  height: 100vh;
  background-color: #93defe;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
  
  
