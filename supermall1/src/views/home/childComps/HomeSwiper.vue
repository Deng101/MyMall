<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad"><!-- @load="imageLoad" 监听加载完成 放入img中-->
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper";
export default {
name: "HomeSwiper",
  props: {
   banners:{
     type: Array,
      default(){
       return[]
      }
   }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad(){
    //   //imageLoad无法正常使用，暂时放弃
      this.$nextTick(() => {
        this.$emit('swiperImageLoad')
      })
    //   this.$emit('swiperImageLoad')

    },
  }
}
</script>

<style scoped>

</style>
