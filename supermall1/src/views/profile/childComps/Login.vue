<template>
  <div class="login" id="tlogin">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      id="el-form"
    >
       
      <div class="el-message-box__header">
        <div class="el-message-box__title"><!----><span>登陆</span></div>
        <button
          type="button"
          aria-label="Close"
          class="el-message-box__headerbtn"
          @click="closelg('ruleForm')"
        >
          <i class="el-message-box__close el-icon-close"></i>
        </button>
      </div>
      <el-form-item label="账号" prop="uname">
        <el-input
          type="text"
          v-model="ruleForm.uname"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectUser">登录</el-button
        ><el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

      <div class="newuser" @click="showregist">
        <a href="javascript:">新用户注册</a>
      </div>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import { Message } from "element-ui";
import { mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
    };
    var validateUname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      }
    };
    return {
      ruleForm: {
        uname: "",
        pass: "",
      },
      rules: {
        uname: [{ validator: validateUname, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["username","password","log_status"]),
  },
  methods: {
    closelg(formName) {
      document.getElementById("mask").style.display = "none";
      document.getElementById("tlogin").style.display = "none";
      document.getElementById("register").style.display = "none";
      this.resetForm(formName);
    },
    showregist() {
      document.getElementById("register").style.display = "block";
      document.getElementById("tlogin").style.display = "none";
    },
    selectUser() {
      let username = this.ruleForm.uname;
      let password = this.ruleForm.pass;
      axios
        .post("api/user/selectUser", {
          username,
        })
        .then((res) => {
          if (res.data.length === 0) {
            Message.error("该账号不存在");
          } else if (
            res.data.length >= 1 &&
            password === res.data[0].password
          ) {
            Message.success("登录成功！");
            this.$store.dispatch('changeStatus',res.data[0].username)
            /* this.$store.state.username = res.data[0].username */
            this.closelg();
          } else {
            Message.error("密码错误！");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
.login {
  position: absolute;
  z-index: 2000;
  background-color: #ffffff;
  padding-bottom: 10px;
  text-align: center;
  border-radius: 5px;
  left: 10%;
  right: 10%;
  top: 25%;
}
.newuser a {
  color: #269bb7;
  text-decoration: underline;
}
</style>