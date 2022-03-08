<template>
  <div class='wrapper' ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType:{
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type:Boolean,
      default: false
    }
  },
  data(){
    return{
      scroll:null
    }
  },
  mounted() {
      // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true,
      //better-scroll 2.x以上需要添加observeDOM属性才可以滑动
      observeDOM:true,
      observeImage: {
        debounceTime: 100
      }
    })

    //2.监听滚动位置
    this.scroll.on('scroll',(position) => {
      // console.log(position);
      this.$emit('scroll',position)
    })
    // 监听scroll滚动到底部
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',() => {
        // console.log('监听到上拉到底部');
        this.$emit('pullingUp')
      })
    }
    this.scroll.scrollTo(0, 0)
    // console.log(this.scroll);
  },
  methods: {
    scrollTo(x, y, time=500){
      // 判断scroll是否有值再继续进行
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>
