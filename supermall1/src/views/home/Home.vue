<template>
  <div id="home">
    <nav-bar class="home_navbar"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 v-show="isTabFixed" ref="tabControl1"/>      <!--    ref="tabControl1"-->
   <scroll class="content"
           ref="scroll" :probe-type="3"
           @scroll="contentScroll" :pull-up-load="true"
           @pullingUp="loadMore">
     <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/> <!--     @swiperImageLoad="swiperImageLoad"-->
     <recommend-view :recommends="recommends"/>
     <feature-view/>
     <tab-control :titles="['流行','新款','精选']"
                  @tabClick="tabClick" ref="tabControl2"
                  :class="{fixed: isTabFixed}"/><!--     ref="tabControl2"-->
     <goods-list :goods="showGoods"/>
   </scroll>
<!--    组件不可以直接监听，添加.native修饰符可以监听原生事件-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

// 公共组件
import NavBar from "../../components/common/navbar/NavBar";
import TabControl from "../../components/content/tabControl/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";
import Scroll from "../../components/common/scroll/Scroll";
import BackTop from "../../components/content/backTop/BackTop";
// 方法组件
import {getHomeMultidata, getHomeGoods} from "network/home"

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return{
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  activated() {
    //这里scrollTo的第三个参数时间不能为0，为0则会出现点击记录消失，自动返回顶部
    this.$refs.scroll.scrollTo(0,this.saveY,1)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y

    // console.log(this.saveY);
  },
  methods: {
    /**
    * 网络请求相关方法
    * */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    },
    /**
    * 监听事件
    * */
    tabClick(index){
      switch (index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick(){
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position){
      // 判断backTop是否显示
      this.isShowBackTop = (-position.y) > 1000

      //决定tabControl是否吸顶（position:fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      // console.log('加载更多');
      this.getHomeGoods(this.currentType)

    },
    swiperImageLoad(){
      //获取数据不正确，放弃
      //已解决，系浏览器打开切换手机模式过程中已经获取到了offserTOp，但是手机模式下可以获取正确offsetTop
      // 获取tabControl的offsetTop
      //  所有的组件都有一个属性$el: 用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      // console.log(this.tabOffsetTop);
    },
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
}
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;

  }
  .content{
    height: calc(100% - 93px);
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    /*margin-top: 44px;*/
  }
  .home_navbar{
    background-color:  #FF0000;
    color: white;
    font-weight: 700;
    /*固定导航栏*/
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*z-index: 9;*/
  }
  .fixed{
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }
  /*.tab-control{*/
  /*  position: relative;*/
  /*  z-index: 9;*/
  /*}*/
  /*.tab-control{*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  z-index: 1000;*/
  /*}*/
</style>
