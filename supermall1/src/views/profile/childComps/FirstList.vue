<template>
  <div class="orderlist">
    <div class="order">
      <h3>我的订单</h3>
    </div>
    <menu-list>
    <menu-list-item>
      <div slot="item-icon">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="icon[0]" />
        </svg>
      </div>
      <div slot="item-text">
        <span class="item-botton">{{ text[0] }}</span>
      </div>
    </menu-list-item>
    <menu-list-item>
      <div slot="item-icon">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="icon[1]" />
        </svg>
      </div>
      <div slot="item-text">
        <span class="item-botton">{{ text[1] }}</span>
      </div>
    </menu-list-item>
    <menu-list-item>
      <div slot="item-icon">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="icon[2]" />
        </svg>
      </div>
      <div slot="item-text">
        <span class="item-botton">{{ text[2] }}</span>
      </div>
    </menu-list-item>
    <menu-list-item>
      <div slot="item-icon">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="icon[3]" />
        </svg>
      </div>
      <div slot="item-text">
        <span class="item-botton">{{ text[3] }}</span>
      </div>
    </menu-list-item>
    <menu-list-item>
      <div slot="item-icon">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="icon[4]" />
        </svg>
      </div>
      <div slot="item-text">
        <span class="item-botton">{{ text[4] }}</span>
      </div>
    </menu-list-item>
  </menu-list>
  </div>
</template>


<script>
import MenuList from "../../../components/common/menulist/MenuList.vue";
import MenuListItem from "../../../components/common/menulist/MenuListItem.vue";

export default {
  name: "FirstList",
  components: {
   MenuList,
    MenuListItem,
  },
  data() {
    return {
      icon: [
        "#icon-31daifukuan",
        "#icon-daifahuo",
        "#icon-daishouhuo",
        "#icon-pingjia",
        "#icon-shouhou",
      ],
      text: ["待付款", "待收货", "待评价", "待评价", "退款/售后"],
    };
  },
  methods: {
  },
};
</script>

<style scoped>
.orderlist {
  margin: 10px 5px;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 5px 5px;
}
.order {
  height: 30px;
}
.order h3 {
  font-size: 15px;
  line-height: 30px;
  color: #222222;
}
</style>

