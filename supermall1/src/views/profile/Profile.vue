<template>
  <div class="profile" id="pfile">
    <div id="mask"></div>
    <transition>
      <location-view v-if="isshowlocation" @closelocation="changelocation"/>
    </transition>
    <nav-bar class="nav-bar"><div slot="center">我的</div> </nav-bar>
    <div class="login" id="tlogin" style="display: none"> 
      <login></login>
    </div>
    <div class="register" id="register" style="display: none">
      <register-view></register-view>
    </div>

  <div class="content">
        <div>
      <login-view>
        <h3 slot="nlog" @click="showlg">登录/注册</h3>
      </login-view>
    </div>
    <list-view/>
    <first-list/>
    <second-list/>
    <third-list/>
    <div class="orderset" @click="changelocation">
      <span>
        <i class="el-icon-location-outline"></i>
        地址管理</span>
      <i class="el-icon-arrow-right right"></i>
    </div>
    <div class="orderset">
      <span>
        <i class="el-icon-bell"></i>
        消息通知设置</span>
      <i class="el-icon-arrow-right right"></i>
    </div>
    <div class="orderset">
      <span>
        <i class="el-icon-s-custom"></i>
        隐私管理</span>
      <i class="el-icon-arrow-right right"></i>
    </div>
    <div class="orderset">
      <span>
        <i class="el-icon-paperclip"></i>
        通用</span>
      <i class="el-icon-arrow-right right"></i>
    </div>
    <div class="orderset">
      <span>
        <i class="el-icon-s-check"></i>
        诊断工具</span>
      <i class="el-icon-arrow-right right"></i>
    </div>

    <div class="btn" v-show="!getlog_status">
      <el-button type="danger" plain @click="loginOut()" class="elbtn"
        >危险按钮</el-button
      >
    </div>
  </div>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import ListView from "./childComps/ListView.vue";
import LoginView from "./childComps/LoginView.vue";
import FirstList from "./childComps/FirstList.vue";
import SecondList from "./childComps/SecondList.vue";
import ThirdList from "./childComps/ThirdList.vue";
import RegisterView from "./childComps/RegisterView.vue";
import Login from "./childComps/Login.vue";
import LocationView from "./childComps/LocationView.vue"

import { mapGetters, mapMutations } from "vuex";
import Scroll from '../../components/common/scroll/Scroll.vue';

export default {
  name: "Profile",
  components: {
    NavBar,
    ListView,
    LoginView,
    FirstList,
    RegisterView,
    Login,
    SecondList,
    ThirdList,
    Scroll,
    LocationView,
  },
  data(){
    return {
      isshowlocation: false,
    }
  },
  computed: {
    ...mapGetters(["log_status"]),
    getlog_status() {
      return this.$store.state.log_status;
    },
  },
  
  methods: {
    showlg() {
      document.getElementById("mask").style.display = "block";
      document.getElementById("tlogin").style.display = "block";
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    loginOut() {
      this.$store.dispatch("changeStatus");
      console.log(this.$store.state.log_status);
    },
    changelocation(){
      this.isshowlocation = !this.isshowlocation
    },
    closelocation(){
      this.isshowlocation = !this.isshowlocation
    }
  },
};
</script>

<style>
.profile {
  position: relative;
  height: 100vh;
  background-color: #f2f2f2;
  /* z-index: 1000; */
}

.content{
    overflow: auto;
    height: calc(100% - 93px);
  }
.content::-webkit-scrollbar{
    display:none;/*隐藏滚动条*/ 
  }

.icon {
  width: 1.3em;
  height: 1.3em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.ricon {
  position: absolute;
  right: 20px;
  top: 2px;
}
#mask {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1800;
}

.nav-bar {
  background-color: red;
  color: white;
  font-weight: 700;
}
h3 {
  position: relative;
  padding-left: 10px;
  line-height: 80px;
  font-size: 20px;
}
.orderset{
  position: relative;
  width: 100%;
  height: 40px;
  font-size: 16px;
  line-height: 40px;
  background-color: #ffffff;
}
.orderset span{
  margin: 15px;
}
.orderset .right{
  position: absolute;
  right: 10px;
  top: 6px;
}

/* element ui调整 */
.demo-ruleForm {
  padding: 10px 15px;
}
.el-form-item__label {
  text-align: left;
  width: 68px !important;
}
.el-form-item__content {
  margin-left: 68px !important;
}
.btn{
   text-align: center;
  width: 100%;
}
.elbtn {
  width: 80%;
}

/*动画部分  */
.v-enter{
  transform: translateX(100%);
}
.v-enter-active{
  transition: transform .3s;
}
.v-enter-to{
  transform: translateX(0);
}
.v-leave{
  transform: translateX(0);
}
.v-leave-active{
  transition: transform .3s;
}
.v-leave-to{
  transform: translateX(100%);
}
</style>
