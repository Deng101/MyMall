<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item,index) in this.titles"
           class="title-item" :class="{actived: index === currentIndex}"
           @click="titleClick(index)"
           :key="index">
        {{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data(){
    return{
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index){
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 13px;
  }
  .title-item{
    flex: 1;
  }
  .actived{
    color: red;
  }
  .back img{
    /*margin-top: 10px;*/
    vertical-align: middle;
    margin-left: 20px;
  }
</style>
