<template>
  <div class="popup-main">
    <div class="top">
      <img :src="topImage[0]" alt="" class="goods-img" />
      <span class="price">{{ goods.newPrice }}</span>
      <i class="el-icon-circle-close" @click="iconClose"></i>
    </div>
    <div class="middle">
      <div class="title">
        <h3>尺码</h3>
      </div>
      <div ref="choiceSize">
        <input
          type="button"
          @click="change"
          value="s"
          class="size activecolor"
        />
        <input type="button" @click="change" value="M" class="size" />
        <input type="button" @click="change" value="L" class="size" />
        <input type="button" @click="change" value="XL" class="size" />
        <input type="button" @click="change" value="2XL" class="size" />
        <input type="button" @click="change" value="3XL" class="size" />
      </div>
    </div>

    <div class="buycount">
      <div>购买数量</div>
      <div class="cgcount">
        <input
        disabled
          class="decrement"
          type="button"
          value="-"
          ref="decrement"
          @click="decrement"
        />
        <span class="count" ref="count">{{count}}</span>
        <input
          class="increment"
          type="button"
          value="+"
          ref="increment"
          @click="increment"
        />
      </div>
    </div>
    <div class="addcart" @click="comfirm">
      <button>确定</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailPopupMain",
  props: {
    topImage: {
      type: Array,
      defalut() {
        return [];
      },
    },
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data(){
    return{
      size: "S",
      count: 1
    }
  },
  methods: {
    increment() {
      this.count++
      if (this.count > 1) {
        this.$refs.decrement.disabled = "";
      }
    },
    decrement() {
      if (this.count <= 2) {
        this.$refs.decrement.disabled = "disabled";
        this.count--
      }else{
        this.count--
      }
    },
    change(event) {
      /* childNodes是choiceSize下的所有子节点，for循环把全部活跃类去掉 */
      for (let i = 0; i < this.$refs.choiceSize.childNodes.length; i++) {
        this.$refs.choiceSize.childNodes[i].classList.remove("activecolor");
      }
      /* event可以帮助获得当前被点击的元素 */
      event.currentTarget.classList.add("activecolor");
    },
    iconClose() {
      this.$emit("iconClose");
      console.log(this.$refs.count.innerText);
    },
    comfirm() {
      for (let i = 0; i < this.$refs.choiceSize.childNodes.length; ++i) {
        if (
          this.$refs.choiceSize.childNodes[i].classList.contains("activecolor")
        ) {
          this.size = this.$refs.choiceSize.childNodes[i].value
        }
      }
      this.$emit("comfirm",this.size,this.count);
    },
    
  },
};
</script>

<style scoped>
.popup-main {
  position: fixed;
  width: 100%;
  height: 375px;
  bottom: 0;
  /* bottom: -375px; */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #ffffff;
  z-index: 1100;
}
.top {
  font-size: 22px;
  color: #9b9b9b;
}
.goods-img {
  width: 80px;
  height: 95px;
  border-radius: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
}
.price {
  position: absolute;
  top: 50px;
  left: 100px;
  font-size: 18px;
  color: #ff6a86;
}
.el-icon-circle-close {
  position: absolute;
  right: 15px;
  top: 15px;
  width: 20px;
  height: 20px;
}
input {
  background: none;
  outline: none;
  border: none;
}
.middle {
  width: 96%;
  position: absolute;
  top: 130px;
  left: 2%;
  padding-top: 15px;
  border-top: 1px solid #9b9b9b;
}
.size {
  font-size: 16px;
  width: 50px;
  height: 30px;
  line-height: 30px;
  margin: 10px 5px;
  background-color: #f4f4f6;
  border-radius: 5px;
}
.title > h3 {
  font-weight: 400;
  font-size: 18px;
  line-height: 18px;
}
.buycount {
  position: absolute;
  top: 240px;
  padding-top: 15px;
  width: 96%;
  left: 2%;
  height: 22px;
  border-top: 1px solid #9b9b9b;
}
.cgcount {
  position: absolute;
  display: flex;
  right: 10px;
  width: 80px;
  height: 22px;
  border: 1px solid rgb(143, 128, 128);
  text-align: center;
  border-radius: 10px;
}
.buycount .decrement {
  border-right: 1px solid rgb(143, 128, 128);
}
.buycount .increment {
  border-left: 1px solid rgb(143, 128, 128);
}
.count,
.decrement,
.increment {
  flex: 1;
}
.addcart {
  position: absolute;
  width: 96%;
  left: 2%;
  bottom: 13px;
}
.addcart button {
  width: 100%;
  height: 36px;
  border-radius: 18px;
  background-color: red;
}

.activecolor {
  border: 1px solid pink;
  color: #ff6a86;
}
button {
  background: none;
  outline: none;
  border: none;
}
</style>