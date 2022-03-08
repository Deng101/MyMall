<template>
    <div class="loginview">
        <span class="userAvatar"><img src="../../../assets/img/user/touxiang.jpg" alt=""></span>
        <ul class="lgtitle">
            <li v-if="getlog_status"><slot name="nlog"><h3></h3></slot>
            </li>
            <li v-else><h3>{{getuname}}</h3></li>
        </ul>
        <slot></slot>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'LoginView',
    computed: {
    ...mapGetters(["username","password","log_status"]),
    getuname(){
        return this.$store.state.username
    },
    getlog_status(){
        return this.$store.state.log_status
    },
    
  },
  
};
</script>

<style scoped>
ul{
    list-style: none;
    height: 100%;
}
.loginview {
    width: 100%;
    height: 80px;
}
.userAvatar {
  margin: 10px 0 0 40px;
  float: left;
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
}
.userAvatar img{
    width: 60px;
    height: 60px;
}
.lgtitle{
    margin-left: 50px;
    display: flex;
}
h3{
    font-weight: 400;
    color: #222222;
}
</style>