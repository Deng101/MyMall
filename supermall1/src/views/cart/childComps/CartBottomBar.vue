<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>

    <div v-if="ifshow" class="calview">
      <div class="price">合计：{{ totalPrice }}</div>
      <div class="calculate" @click="calcClick">去计算：{{ checkLength }}</div>
    </div>
    <div v-else class="delview">
      <button class="button1" @click="delall">清空购物车</button>
      <button class="button2" @click="delsel">删除选中</button>
    </div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
import Toast from "../../../components/common/toast/Toast.vue";
export default {
  name: "CartBottomBar",
  components: { CheckButton, Toast },
  data() {
    return {
      show: true,
    };
  },
  props: {
    ifshow: {
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((previousValue, item) => {
            return item.price * item.count + previousValue;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      // return this.$store.state.cartList.filter(item => item.checked).length
      // 上面没有把count的数量也加上
      return this.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((previousValue, item) => {
          return previousValue + item.count;
        }, 0);
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      return !this.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      // console.log('click');
      if (this.isSelectAll) {
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.showToast("请选择所需商品", 2000);
      }
    },
    delall() {
      this.$store.dispatch("delall").then(res => {
        this.$toast.showToast(res,2000)
      });
    },
    delsel() {
      let arr = []
      for(let index in this.cartList){
        if(this.cartList[index].checked === true){
          arr.push(index)
        }
      }
      /* 这里先把数组翻转，这样不会因为删除了前面的元素后元素下表改变而导致的删除错误 */
      arr = arr.reverse()
      console.log(arr);
      this.$store.dispatch('delsel',arr).then(res => {
        this.$toast.showToast(res,2000)
      })
    },
  },
};
</script>

<style scoped>
button {
  background: none;
  outline: none;
  border: none;
}
.bottom-bar {
  position: relative;
  display: flex;
  background-color: #eee;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  line-height: 40px;
  width: 70px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-left: 10px;
  margin-right: 5px;
}
.delview .button1,
.button2 {
  position: absolute;
  border: 1px solid #ff0000;
  color: #ff0000;
  height: 30px;
  width: 90px;
  border-radius: 15px;
}
.delview .button1 {
  right: 120px;
  top: 5px;
}
.delview .button2 {
  right: 20px;
  top: 5px;
}
.calview {
  flex: 1;
  display: flex;
}
.price {
  flex: 1;
  margin-left: 20px;
}
.calculate {
  flex: 1;
  background-color: orangered;
  width: 87px;
  color: white;
  text-align: center;
}
</style>
