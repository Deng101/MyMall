<template>
  <div class="locationview">
    <header>
      <i class="el-icon-arrow-left" @click="backicon"></i>
      <div>新建收货地址</div>
    </header>
    <section>
      <div>
        <label for="name">收货人</label
        ><input
          type="text"
          placeholder="请填写收货人姓名"
          v-model="name"
          id="name"
          ref="name"
          autocomplete="off"
        />
      </div>
      <div>
        <label for="tel">手机号码</label
        ><input
          type="number"
          placeholder="请填写收货人手机号"
          v-model="tel"
          id="tel"
          ref="tel"
          autocomplete="off"
        />
      </div>
      <div>
        <label for="location">详细地址</label
        ><input
          type="text"
          placeholder="请填写收货详细地址"
          v-model="location"
          id="location"
          ref="location"
          autocomplete="off"
        />
      </div>
    </section>

    <div class="confirm" @click="confirmlocation">
      <input type="submit" value="确定" />
    </div>
  </div>
</template>

<script>
import Toast from "../../../components/common/toast/Toast.vue";
export default {
  name: "AddLocationView",
  components: {
    Toast,
  },
  data() {
    return {
      name: null,
      tel: null,
      location: null,
    };
  },
  methods: {
    backicon() {
      this.$emit("changeaddlocation");
    },
    confirmlocation() {
      if (!this.name) {
        this.$toast.showToast("姓名不能为空哦！", 1000);
      } else if (!this.tel) {
        this.$toast.showToast("电话号码不能为空哦！", 1000);
      } else if (!this.location) {
        this.$toast.showToast("地址不能为空哦！", 1000);
      } else {
        const newlocation = {};
        newlocation.name = this.$refs.name;
        newlocation.tel = this.$refs.tel;
        newlocation.location = this.$refs.location;
        console.log(newlocation.name.value);
        this.$store.dispatch("addLocation", newlocation).then((res) => {
            console.log(res);
          this.$toast.showToast(res, 2000);
        });
      }
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