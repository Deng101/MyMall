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
  name: "SecondList",
  components: {
   MenuList,
    MenuListItem,
  },
  data(){
    return{
      icon: ['el-icon-s-ticket','el-icon-menu','el-icon-edit-outline','el-icon-time'],
      text: ['优惠','菜单','记录','浏览记录'],
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