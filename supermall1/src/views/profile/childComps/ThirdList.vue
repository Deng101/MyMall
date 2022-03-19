<template>
  <div class="orderlist">
    <menu-list>
    <menu-list-item>
      <div slot="item-icon" class="item-icon"><i :class="icon[0]"></i></div>
      <div slot="item-text">
        <span>{{text[0]}}</span>
      </div>
    </menu-list-item>
    <menu-list-item>
      <div slot="item-icon" class="item-icon"><i :class="icon[1]"></i></div>
      <div slot="item-text">
        <span>{{text[1]}}</span>
      </div>
    </menu-list-item>
    <menu-list-item>
      <div slot="item-icon" class="item-icon"><i :class="icon[2]"></i></div>
      <div slot="item-text">
        <span>{{text[2]}}</span>
      </div>
    </menu-list-item>
    <menu-list-item>
      <div slot="item-icon" class="item-icon"><i :class="icon[3]"></i></div>
      <div slot="item-text">
        <span>{{text[3]}}</span>
      </div>
    </menu-list-item>
  </menu-list>
  </div>
</template>

<script>
import MenuList from "../../../components/common/menulist/MenuList.vue";
import MenuListItem from "../../../components/common/menulist/MenuListItem.vue";
export default {
  name: "ThirdList",
  components: {
   MenuList,
    MenuListItem,
  },
  data(){
    return{
      icon: ['el-icon-map-location','el-icon-attract','el-icon-service','el-icon-chat-dot-round'],
      text: ['收货地址','试用领取','官方客服','我的评价'],
    }
  },
  methods: {},
};
</script>

<style scoped>
.orderlist {
  margin: 10px 5px;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 5px 5px;
}
.item-icon{
  font-size: 21px;
}
</style>