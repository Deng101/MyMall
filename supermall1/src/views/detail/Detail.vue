<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">

      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"/>

      <detail-param-info :param-info="paramInfo" ref="params"/>

      <detail-comment-info :comment-info="commentInfo" ref="comment"/>

      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar class="bottom-bar" @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <toast message="添加"/>
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

import GoodsList from "../../components/content/goods/GoodsList";
import Toast from "../../components/common/toast/Toast";

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "../../network/detail";
import {backTopMixin} from "../../common/mixin";
import {debounce} from 'common/utils'
import Scroll from "../../components/common/scroll/Scroll";

export default {
  name: "Detail",
  components:{
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
    Toast,
  },
  mixins:[backTopMixin],
  data(){
    return{
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {
        user: {}
      },
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
      // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 1.获取顶部的图片轮播图数据
      const data = res.result
        // console.log(res);
        this.topImages = data.itemInfo.topImages
      // console.log(this.topImages);
      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //3.获取店铺信息
      this.shop = new Shop(data.shopInfo)
      //获取商品详情信息
      this.detailInfo = data.detailInfo
      //获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //获取评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
      // this.$nextTick(() => {
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs);
      // })
    })
    //3. 请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })
    //给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      //这里必须开始就把themeTopYs赋值为空数组，不然他会获取多次，并且因为push，里面的内容会越来越多，我们要的只是最终的数组，所以每次必须赋值为空
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
        // console.log(this.themeTopYs);
    },10)

  },
  methods: {
    detailImageLoad(){
      this.getThemeTopY()
    },
    titleClick(index){
      this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position){
      // console.log(position.y);
      //同步滚动时详情页的活跃标题（DetailNavBar）
      const positionY = -position.y
      let length = this.themeTopYs.length
      for(let i = 0; i < length; i++){
        if (this.currentIndex !== i
          && ((positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i+1])
          ||(i === length - 1 && positionY >= this.themeTopYs[i]))){
          this.currentIndex = i;
          // console.log(this.currentIndex);
          //通过$refs取到子组件的属性，并把子组件属性重新赋值
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      this.isShowBackTop = (-position.y) > 1000
    },
    addToCart(){
      console.log('addToCart');
      // 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // 将商品添加到购物车
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res => {
        this.$toast.showToast(res,2000)
        // console.log(this.$toast);
      })


    }
  }
}
</script>

<style scoped>
  #detail {
    /*这里的属性是覆盖底部NavBar的，否则NavBar脱离标准流会显示在详情页*/
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 93px);
    /*overflow:hidden在content中使用可以把非滚动地方隐藏，防止navbar和bottombar随鼠标的滑动而滑动*/
    overflow: hidden;
  }

</style>
