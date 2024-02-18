
  

<template>
  <div style="position: relative;">
    <div style="position: fixed;width: 100%;height: 100%;">
      <vue-particles color="#09b6c5" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4"
        linesColor="#09b6c5" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3"
        :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
      </vue-particles>
    </div>
    <el-container>

      <el-header>
        <el-menu class="el-menu-home" mode="horizontal" background-color="#FFFFFF" text-color="#8491a5"
          active-text-color="#09b6c5">
          <el-menu-item @click="to('/Client/Home')">
            <img style="width:50px" src="@/assets/banner.png" />
          </el-menu-item>

          <el-menu-item index='Home' @click="to('/Client/Home')">系统名称</el-menu-item>
          <el-menu-item index="CouseTypeList" @click="to('/Client/CouseTypeList')">课程预约</el-menu-item>
          <el-menu-item index="NoticeList" @click="to('/Client/NoticeList')">通知公告</el-menu-item>
          <el-menu-item index="Login" style="float:right" v-if="!token" @click="to('/login')">登录</el-menu-item>
          <el-menu-item index="Register" @click="to('/Register')" style="float:right" v-if="!token">注册</el-menu-item>
          <el-menu-item index="ForgetPassword" @click="to('/ForgetPassword')" style="float:right"
            v-if="!token">忘记密码</el-menu-item>
          <el-submenu index="" v-if="token" style="float:right">
            <span slot="title">{{ name }}</span>
            <el-menu-item index="MyUserInfo" @click="to('/Client/MyUserInfo')">个人中心</el-menu-item>
            <el-menu-item @click="reset">注销</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-header>

      <el-main style="padding:0px">

        <div class="main-app margin-top-xs">
          <router-view></router-view>
        </div>

      </el-main>
      <el-footer class="footer-box" style="  height: 150px;">
        <div class="">
          <p>
            <a href="http://www.hnr.cn/hnr_jianjie/article/1/1420207195722747904">网站简介</a> | <a
              href="http://www.hnr.cn/about/copyright.html">版权声明</a> | <a href="http://www.hnr.cn/about/ad.html">广告服务</a>
            | <a href="http://www.hnr.cn/about/tel.html">联系方式</a> | <a href="http://www.hnr.cn/about/map.html">网站地图</a>
          </p>
          <p>Copyright ? 2023 hnr.cn Corporation,All Rights Reserved</p>
          <p> 系统名称 版权所有</p>
        </div>

      </el-footer>
    </el-container>
    <EditPasswordModal ref="EditPasswordModal"></EditPasswordModal>
    <EditUserModal ref="EditUserModal"></EditUserModal>
  </div>
</template>

<script>
import EditPasswordModal from "@/layout/components/EditPasswordModal"
import EditUserModal from "@/layout/components/EditUserModal"
import store from "@/store";
import router from '@/router';
import { mapGetters } from "vuex";
export default {
  components: { EditUserModal, EditPasswordModal },
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  computed: {
    ...mapGetters(["name", "token", "roleType", "roleTypeFormat", "userId",]),
  },
  created() {
  },
  methods: {
    to(url) {
      router.push({
        path: url, query: {
        }
      })
    },
    reset() {
      this.$store.dispatch('user/logout')

    },
    async ShowEditPasswordModal() {

      this.$refs.EditPasswordModal.ShowEditPasswordModal();

    },
    async ShowEditUserModal() {
      this.$refs.EditUserModal.ShowEditUserModal();
    },

  }
};
</script>
<style scoped >
.el-header {
  padding: 0px !important;
}

.el-menu-home {
  padding: 0 300px;

}

.main-app {
  margin: 0px 0px;
  padding: 0px;
  min-height: 100vh;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.footer-box {

  background-color: #09b6c5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>




