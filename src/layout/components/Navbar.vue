

<template>
  <div class="navbar" :style="{ 'background-color': theme.navbarbgcolor }">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />


    <div class="right-menu">

      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <span class="name">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item divided @click.native="ShowEditUserModal">
            <span style="display: block">个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="ShowEditPasswordModal">
            <span style="display: block">修改密码</span>
          </el-dropdown-item>
          <!-- <el-dropdown-item>
            <span style="display: block" @click="ClickTheme()">主题切换</span>
          </el-dropdown-item> -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出系统</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>


    </div>
    <EditPasswordModal ref="EditPasswordModal"></EditPasswordModal>
    <EditUserModal ref="EditUserModal"></EditUserModal>

    <el-dialog  title="主题编辑" :visible.sync="drawer" width="80%" append-to-body height="800px">
      <themeDrawer></themeDrawer>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ThemeDrawer from "@/layout/components/ThemeDrawer"
import EditPasswordModal from "@/layout/components/EditPasswordModal"
import EditUserModal from "@/layout/components/EditUserModal"
import store from "@/store";
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ThemeDrawer,
    EditPasswordModal,
    EditUserModal
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar", "tenants", "currentTenant", 'theme']),
  },
  data() {
    return {
      drawer: false,
      editorShow: false,
    };
  },

  methods: {
    async ClickTheme() {
      this.drawer = true;
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login`);
    },

    async ShowEditPasswordModal() {

      this.$refs.EditPasswordModal.ShowEditPasswordModal();

    },
    async ShowEditUserModal() {
      this.$refs.EditUserModal.ShowEditUserModal();
    },


  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;

  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }


  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;

        .name {
          padding-left: 15px;
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
  
  
  

  
  
