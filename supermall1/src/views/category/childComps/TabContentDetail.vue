<template>
  <div class="tab-content-detail">
    <goods-list-item
      v-for="(item, index) in categoryDetail"
      :key="index"
      :goodsitem="item"
    >
    </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "../../../components/content/goods/GoodsListItem.vue";
export default {
  name: "TabContentDetail",
  components: {
    GoodsListItem,
  },
  props: {
    categoryDetail: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {},
};
</script>

<style scoped>
.tab-content-detail {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>