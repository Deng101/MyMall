<template>
  <div class="cart">
    <!--    导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
      <div slot="right" class="right" v-if="this.ifshow" @click="edit">编辑</div>
      <div slot="right" class="right" v-else @click="finishedit">完成</div>
    </nav-bar>
    <!--    商品的列表-->
    <cart-list />
    <!--    底部汇总-->
    <cart-bottom-bar :ifshow="ifshow"/>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
import Scroll from "../../components/common/scroll/Scroll";
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar,
  },
  data() {
    return {
      ifshow: true,
    };
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
  methods: {
    edit() {
      return this.ifshow = !this.ifshow;
    },
    finishedit() {
      return this.ifshow = !this.ifshow;
    },
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: red;
  color: white;
  font-weight: 700;
}
.nav-bar .right {
  font-size: 15px;
  color: #333333;
  font-weight: 400;
  text-align: center;
}
</style>
