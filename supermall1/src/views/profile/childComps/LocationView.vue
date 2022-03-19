<template>
  <div class="locationview">
    <transition>
      <add-location-view
        v-if="isshowaddolcation"
        @changeaddlocation="changeaddlocation"
      />
    </transition>
    <header>
      <i class="el-icon-arrow-left" @click="backicon"></i>
      <div>我的收货地址</div>
    </header>
    <div class="addlocation" @click="changeaddlocation">
      <a href="JavaScript:void(0)"><i class="el-icon-plus"></i>添加新地址</a>
    </div>
    <section>
           
        
      <ul>
        <li v-for="(item, index) in myLocation" :key="index">
          <h4>{{item.name.value}}<span class="tel">{{item.tel.value}}</span></h4>
          <div class="loc">{{item.location.value}}
              <i class="el-icon-edit-outline icon"></i>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import AddLocationView from "./AddLocationView.vue";
import {mapGetters} from "vuex";
export default {
  name: "LocationView",
  components: {
    AddLocationView,
  },
  data() {
    return {
      isshowaddolcation: false,
    };
  },
  computed: {
      ...mapGetters([
          'myLocation'
      ])
  },
  methods: {
    backicon() {
      this.$emit("closelocation");
    },
    changeaddlocation() {
      this.isshowaddolcation = !this.isshowaddolcation;
    },
  },
};
</script>

<style scoped>
.locationview {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2222;
  background-color: #ffffff;
}
.locationview header {
  background-color: #f5f5f0;
  position: relative;
  font-size: 20px;
  height: 49px;
  line-height: 49px;
  border-bottom: 1px solid #e0e0d1;
}
.locationview header i {
  position: absolute;
  left: 10px;
  top: 13px;
}
.locationview header div {
  width: 100%;
  margin: auto;
  text-align: center;
}
section {
  position: relative;
  width: 96%;
  margin: auto;
}
section ul li {
    position: relative;
  border-bottom: 1px solid #eaeae1;
}
section ul li h4 {
  font-weight: 400;
  font-size: 18px;
  margin: 10px 20px 5px;
}
section ul li .loc {
  margin: 5px 20px 10px;
  font-size: 16px;
}
section ul li h4 .tel {
  padding-left: 10px;
}
section ul li .loc .icon {
  font-size: 25px;
  position: absolute;
  right: 5px;
  top: 10px;
}
.addlocation {
  width: 100%;
  height: 44px;
  line-height: 44px;
  font-size: 19px;
  border-bottom: 1px solid #e0e0d1;
}
.addlocation a {
  color: #29b8db;
  display: block;
  width: 150px;
  margin: auto;
  text-align: center;
}

/*动画部分  */
.v-enter {
  transform: translateX(100%);
}
.v-enter-active {
  transition: transform 0.3s;
}
.v-enter-to {
  transform: translateX(0);
}
.v-leave {
  transform: translateX(0);
}
.v-leave-active {
  transition: transform 0.3s;
}
.v-leave-to {
  transform: translateX(100%);
}
</style>