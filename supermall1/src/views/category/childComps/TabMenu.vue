<template>
     <scroll id="tab-menu">
        <ul class="menu-list">
            <li :class="{active: index===currentIndex}"
            v-for="(item,index) in categories"
            :key="index"
            @click="itemClick(index)"
            >{{item.title}}</li>
        </ul  >
     </scroll>
</template>

<script>
import Scroll from "../../../components/common/scroll/Scroll";

export default {
    name:"TabMenu",
    components: {
        Scroll
    },
    props: {
        categories: Array
    },
    data(){
        return{
            currentIndex: 0
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex = index
            this.$emit('selectItem',index)
        }
    }
}
</script>

<style scoped>
#tab-menu{
    background-color: #f6f6f6;
    height: 100%;
    width: 100px;
    box-sizing: border-box;
    overflow: hidden;
}

.menu-list>li{
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
}
.menu-list>li.active{
    font-weight: 700;
    color: #ff0000;
    background-color: #fff;
    border-left: 3px solid #ff0000;
}
</style>