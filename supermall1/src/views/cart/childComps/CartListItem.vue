<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button :is-checked="product.checked" @click.native="checkClick" />
    </div>
    <div class="item-img">
      <img :src="product.image" alt="" />
    </div>

    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">商品描述：{{ product.desc }}</div>
      <div class="item-size">尺码：{{ product.size }}</div>

      <div class="item-bottom">
        <div class="item-price left">￥{{ product.price }}</div>

        <div class="item-count right">
          <!-- 这里通过动态绑定：实现当用户在商品详情页面添加多个商品时商品减属性的不可用 -->
          <input
            :disabled="isdisabled"
            class="decrement"
            type="button"
            value="-"
            ref="decrement"
            @click="decrement"
          />
          <span class="count">{{ product.count }}</span>
          <input
            class="increment"
            type="button"
            value="+"
            @click="increment"
            ref="increment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton";
export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    isdisabled() {
      return this.product.count <= 1;
    },
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked;
    },
    increment() {
      this.$store.commit("addCounter", this.product);
      if (this.product.count > 1) {
        this.$refs.decrement.disabled = "";
      }
    },
    decrement() {
      if (this.product.count <= 2) {
        this.$store.commit("subCounter", this.product);
        this.$refs.decrement.disabled = "disabled";
      } else {
        this.$store.commit("subCounter", this.product);
      }
    },
  },
};
</script>

<style scoped>
#shop-item {
  display: flex;
  width: 100%;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  border-radius: 5px;
  display: block;
}
.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.item-info .item-size{
  font-size: 14px;
  color: #666;
}
.item-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.item-bottom .item-price {
  color: orangered;
}
.right {
  display: flex;
  height: 22px;
  width: 80px;
  border: 1px solid rgb(143, 128, 128);
  text-align: center;
  border-radius: 10px;
}
.right .decrement {
  border-right: 1px solid rgb(143, 128, 128);
}
.right .increment {
  border-left: 1px solid rgb(143, 128, 128);
}
.count,
.decrement,
.increment {
  flex: 1;
}
input {
  background: none;
  outline: none;
  border: none;
}
</style>
