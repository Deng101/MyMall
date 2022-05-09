<template>
  <div class="locationview">
    <header>
      <i class="el-icon-arrow-left left" @click="backicon"></i>
      <div>修改收货地址</div>
      <span class="deleteicon" @click="delLoc">删除</span>
    </header>
    <section>
      <div>
        <label for="name">收货人</label
        ><input
          type="text"
          :value="myLocation[testIndex].name"
          id="name"
          ref="name"
          autocomplete="off"
        />
      </div>
      <div>
        <label for="tel">手机号码</label
        ><input
          type="number"
          :value="myLocation[testIndex].tel"
          id="tel"
          ref="tel"
          autocomplete="off"
        />
      </div>
      <div>
        <label for="location">详细地址</label
        ><input
          type="text"
          :value="myLocation[testIndex].location"
          id="location"
          ref="location"
          autocomplete="off"
        />
      </div>
    </section>

    <div class="confirm" @click="confirm">
      <input type="submit" value="确定" />
    </div>
  </div>
</template>

<script>
import Toast from "../../../components/common/toast/Toast.vue";
import { mapGetters } from "vuex";
export default {
  name: "EditLocationView",
  components: {
    Toast,
  },
  computed: {
    ...mapGetters(["myLocation", "testIndex"]),
  },
  methods: {
    backicon() {
      this.$emit("changeaddlocation");
    },
    delLoc() {
      this.$store.dispatch("delLoc", this.testIndex).then((res) => {
          this.$toast.showToast(res,1000)
      });
      console.log(this.testIndex);
      this.backicon();
    },
    confirm(){
        let newLoc = {}
        newLoc.name = this.$refs.name.value
        newLoc.tel = this.$refs.tel.value
        newLoc.location = this.$refs.location.value
        this.$store.dispatch('changelocation',newLoc).then((res) => {
            this.$toast.showToast(res, 1000);
            this.backicon();
        })
    }
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
.locationview header .left {
  position: absolute;
  left: 10px;
  top: 13px;
}
.deleteicon {
  position: absolute;
  right: 10px;
  top: 0;
  font-size: 16px;
  color: #ec4141;
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
section div {
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eaeae1;
}
section div label {
  display: inline-block;
  height: 100%;
  width: 100px;
  padding-left: 10px;
}
section div input {
  border: none;
  outline: none;
  background: none;
  width: 72%;
}

.confirm {
  position: absolute;
  width: 90%;
  left: 5%;
  bottom: 20px;
}
.confirm input {
  color: #ffffff;
  border: none;
  width: 100%;
  height: 36px;
  border-radius: 18px;
  background-color: red;
}
</style>