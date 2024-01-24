<template>
  <div class="login">
    <div class="left" />
    <div class="right">
      <h1>手机号登录</h1>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item prop="mobile">
          <el-input v-model="ruleForm.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            show-password
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="ruleForm.isAgree" prop="isAgree"
            >请阅读协议</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 350px" @click="submitForm"
            >立即创建</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    const ageree = (rule, value, callback) => {
      value ? callback() : callback(new Error("请阅读协议"));
    };
    return {
      ruleForm: {
        mobile: "13800000002",
        password: "hm#qd@23!",
        isAgree: false,
      },
      rules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
        isAgree: [
          {
            validator: ageree,
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch("user/login", this.ruleForm);
          this.$router.push('/')
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.login {
  display: flex;
  .left {
    width: 60%;
    height: 100vh;
    background-image: url("../../assets/common/login_back.png");
    background-size: 100% 100%;
  }
  .right {
    width: 40%;
    height: 100vh;
    background-color: #fff;
    padding-left: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1 {
      font-size: 16px;
    }
    .el-input {
      width: 350px;
      background-color: #ccc;
    }
  }
}
</style>
