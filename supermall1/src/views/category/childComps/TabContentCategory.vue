<template>
  <div class="tab-cate" v-if="subcategories.list">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in subcategories.list" :key="index"
        ><div class="grid-content bg-purple item">
          <a href="item.link">
            <img class="item-img" :src="item.image" alt="" />
            <div class="item-text">{{ item.title }}</div>
          </a>
        </div></el-col
      >
    </el-row>

  </div>
</template>

<script>
export default {
  name: "TabContentCategory",
  props: {
    subcategories: {
      type: Object,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.tab-cate{

}
.item{
    padding: 10px 10px;
}
.item-text{
    text-align: center;
    font-size: 13px;
}

.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}



.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-col-6 {
  width: 33.3%;
}
.item-img {
  width: 100%;
  height: 100%;
}
</style>