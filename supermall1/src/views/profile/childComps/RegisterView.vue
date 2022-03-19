<template>
  <div class="registerv">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="el-message-box__header">
        <div class="el-message-box__title"><!----><span>注册</span></div>
        <button
          type="button"
          aria-label="Close"
          class="el-message-box__headerbtn"
          @click="closelg"
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
        <el-button type="primary" @click="checkUser">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import { Message } from 'element-ui';
export default {
  name: "RegisterView",
  data() {
    var validateUname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
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
  methods: {
    closelg() {
      document.getElementById("mask").style.display = "none";
      document.getElementById("tlogin").style.display = "none";
      document.getElementById("register").style.display = "none";
    },
    checkUser() {
      let username = this.ruleForm.uname;
      let password = this.ruleForm.pass;
      axios
        .post("api/user/selectUser", {
          username,
        })
        .then((res) => {
          /* 此处需要判断是否存在账号，如果res.data.length>=1 则账号被占用。*/
          if (res.data.length === 0) {
            axios
              .post("/api/user/addUser", {
                username,
                password,
              })
              .then((res) => {
                console.log(res);
                Message.success('恭喜您，注册成功！')
                setTimeout(() => {
                  this.closelg();
                }, 1000);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            Message.error('抱歉，该账号已被注册！')
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
.registerv {
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
</style>