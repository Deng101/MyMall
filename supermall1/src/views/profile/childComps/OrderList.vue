<template>
  <div class="orderlist">
    <div class="order">
      <h3>我的订单</h3>
    </div>
    <ul>
      <li>
        <a href="javascript:">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-31daifukuan" />
            </svg>
          </span>
          <span>待付款</span>
        </a>
      </li>
      <li>
        <a href="javascript:">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-daifahuo" />
            </svg>
          </span>
          <span>待收货</span>
        </a>
      </li>
      <li>
        <a href="javascript:">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-daishouhuo" />
            </svg>
          </span>
          <span>待评价</span>
        </a>
      </li>
      <li>
        <a href="javascript:">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-pingjia" />
            </svg>
          </span>
          <span>待评价</span>
        </a>
      </li>
      <li>
        <a href="javascript:">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shouhou" />
            </svg>
          </span>
          <span>退款/售后</span>
        </a>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "OrderList",
};
</script>

<style scoped>
.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
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
ul {
  display: flex;
  list-style: none;
  font-size: 12px;
  
}
ul li {
  flex: 1;
}
ul li a {
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 60px;
}

ul li a span {
    font-size: 13px;
  flex: 1;
  padding: 5px 0;
}

</style>

