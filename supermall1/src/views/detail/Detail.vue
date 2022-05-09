<template>
  <div id="detail">
    <div id="mask" ref="mask"></div>
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detailInfo="detailInfo"
        @detailImageLoad="detailImageLoad"
      />
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <detail-bottom-bar class="bottom-bar" @addCart="addToCart" />

    <transition>
      <detail-popup-main
        :top-image="topImages"
        :goods="goods"
        ref="popupmain"
        v-if="show"
        @iconClose="iconClose"
        @comfirm="comfirm"
      />
    </transition>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <toast message="添加" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import DetailPopupMain from "./childComps/DetailPopupMain.vue";

import GoodsList from "../../components/content/goods/GoodsList";
import Toast from "../../components/common/toast/Toast";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "../../network/detail";
import { backTopMixin } from "../../common/mixin";
import { debounce } from "common/utils";
import Scroll from "../../components/common/scroll/Scroll";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    DetailPopupMain,
    Toast,
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {
      user: {},
      },
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      show: false,
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // 1.获取顶部的图片轮播图数据
      const data = res.result;
      // console.log(res);
      this.topImages = data.itemInfo.topImages;
      // console.log(this.topImages);
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3.获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //获取商品详情信息
      this.detailInfo = data.detailInfo;
      //获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      // this.$nextTick(() => {
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs);
      // })
    });
    //3. 请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });
    //给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      //这里必须开始就把themeTopYs赋值为空数组，不然他会获取多次，并且因为push，里面的内容会越来越多，我们要的只是最终的数组，所以每次必须赋值为空
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      // console.log(this.themeTopYs);
    }, 10);
  },
  methods: {
    detailImageLoad() {
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      // console.log(position.y);
      //同步滚动时详情页的活跃标题（DetailNavBar）
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((positionY >= this.themeTopYs[i] &&
            positionY <= this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          //通过$refs取到子组件的属性，并把子组件属性重新赋值
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.isShowBackTop = -position.y > 1000;
    },

    addToCart() {
      console.log("addToCart");
      this.show = true;
      this.$refs.mask.style.display = 'block'
      console.log(this.$refs.mask.style.display);
    },
    comfirm(size,count){
      console.log(size);
      // 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      product.size = size
      product.count = count
      // 将商品添加到购物车
      // this.$store.commit('addCart',product)
      this.$store.dispatch("addCart", product).then((res) => {
        this.$toast.showToast(res, 2000);
        this.iconClose()
      }); 
      
    },
    iconClose(){
        this.show = false;
        this.$refs.mask.style.display = 'none'
        console.log(this.$refs.mask.style.display);
    },
  },
};
</script>

<style scoped>
#detail {
  /*这里的属性是覆盖底部NavBar的，否则NavBar脱离标准流会显示在详情页*/
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 93px);
  /*overflow:hidden在content中使用可以把非滚动地方隐藏，防止navbar和bottombar随鼠标的滑动而滑动*/
  overflow: hidden;
}
/* 面罩 */
#mask {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}
.test{
  position: fixed;
  bottom: 0;
  width: 300px;
  height: 300px;
  background-color: rgb(65, 7, 7);
}
/* 动画部分 */
/* 进入 */
 .v-enter{
 /* 开始之前 */
 transform: translateY(100%);
  }
 .v-enter-active{
 /* 过程 */
 transition: transform .5s;
  }
 .v-enter-to{
 /* 目标 */
 transform: translateY(0);
  }
/* 离开 */
 .v-leave{
 transform: translateY(0);
  }
 .v-leave-active{
 transition: transform .2s;
  }
 .v-leave-to{
 transform: translateY(100%);
  }
</style>
