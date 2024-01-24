<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 头像 -->
          <img v-if="avatar" :src="avatar" class="user-avatar" />
          <span class="user-avatar" v-else>{{ name.charAt(0) }}</span>
          <!-- 用户名称 -->
          <span class="name">{{ name }}</span>

          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>

          <el-dropdown-item divided>
            <span style="display: block" @click="dialogFormVisible = true"
              >修改密码</span
            >
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item label="旧密码" label-width="100px" prop="oldPassword">
          <el-input
            type="password"
            v-model.trim="form.oldPassword"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="100px" prop="upPassword">
          <el-input
            type="password"
            v-model.trim="form.upPassword"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="重复密码" label-width="100px" prop="newPassword">
          <el-input
            type="password"
            v-model.trim="form.newPassword"
            size="mini"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updata">修改密码</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { updataPassApi } from "@/api/user";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        oldPassword: "",
        upPassword: "",
        newPassword: "",
      },
      rules: {
        oldPassword: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
        ],
        upPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          {
            trigger: "blur",
            min: 6,
            max: 16,
            message: "新密码的⻓度为6-16位之间",
          },
        ],
        newPassword: [
          { required: true, message: "重复密码不能为空", trigger: "blur" },
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (this.form.newPassword == value) {
                callback();
              } else {
                callback(new Error("重复密码和新密码输⼊不⼀致"));
              }
            },
          },
        ],
      },
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "name"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push("/login");
    },
    async updata() {
      delete this.form.upPassword;
      const res = await updataPassApi(this.form);
      this.dialogFormVisible = false;
      this.$store.dispatch("user/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
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
        display: flex;
        align-items: center;
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .user-avatar {
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border-radius: 50%;
          background: #04c9be;
          color: #fff;
          margin-right: 4px;
        }
        .name {
          margin-right: 10px;
          font-size: 16px;
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
