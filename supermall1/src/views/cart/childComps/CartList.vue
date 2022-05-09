<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
        <div>
          <cart-list-item v-for="(item,index) in cartList" 
          :key="index" 
          :product="item"/>
          <h5 style="display:none" v-show="!cartLength">
            <el-empty description="空空如也！"></el-empty>
          </h5>
        </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "../../../components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
import {mapGetters} from 'vuex'
export default {
  name: "CartList",
  components:{
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters([
      'cartList',
      'cartLength'
    ])
  },
  activated() {
    this.$refs.scroll.refresh()
  },
  methods: {
    
  }
}
</script>

<style scoped>
.cart-list{
  height: calc(100% - 44px - 49px - 40px);
}
.content{
  height: 100%;
  overflow: hidden;
}
h5{
  font-size: 15px;
  margin-top: 25%;
  margin-left: 35%;
  transform: translateX(-25%);
}
</style>
