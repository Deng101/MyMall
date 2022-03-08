<template>
  <!--  <div>分类</div>-->
  <div class="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>

      <scroll
        id="tab-content"
        :data="[categoryData]"
        ref="scroll"
        :pull-up-load="true"
      >
        <div>
          <tab-content-category
            :subcategories="showSubcategory"
          ></tab-content-category>
          <tab-control
            :titles="['流行', '新款', '促销']"
            @tabClick="tabClick"
          ></tab-control>
          <tab-content-detail
            :category-detail="showCategoryDetail"
          ></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import TabMenu from "./childComps/TabMenu.vue";
import TabContentCategory from "./childComps/TabContentCategory.vue";
import TabControl from "../../components/content/tabControl/TabControl.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import TabContentDetail from "./childComps/TabContentDetail.vue";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "../../network/category";
import Scroll from "../../components/common/scroll/Scroll.vue";
export default {
  name: "category",
  components: {
    NavBar,
    TabMenu,
    Scroll,
    TabContentCategory,
    TabControl,
    GoodsList,
    TabContentDetail,
  },
  data() {
    return {
      categories: [],
      categoryData: {},
      cates: [],
      currentIndex: -1,
      currentType: "pop",
    };
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
  created() {
    /* 请求分类数据 */
    this._getCategory();
  },
  methods: {
    _getCategory() {
      getCategory().then((res) => {
        // 1.获取分类数据
        this.categories = res.data.category.list;
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0);
      });
    },
    selectItem(index) {
      this._getSubcategories(index);
      console.log(this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ]);
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then((res) => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail("pop");
        this._getCategoryDetail("sell");
        this._getCategoryDetail("new");
      });
    },
    _getCategoryDetail(type) {
      //获取请求miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      //请求数据，传入miniwallkey和type
      getCategoryDetail(miniWallkey, type).then((res) => {
        //保存获取的数据
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
    tabClick(index) {
      /*      这里的currentType需要在data先定义，不然就用混入先定义，记一次获取不到currentType错误的原因 */
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
  },
};
</script>

<style scoped>
.category {
  height: 100vh;
}
.nav-bar {
  background-color: red;
  color: white;
  font-weight: 700;
  /*position: relative;*/
  /*top: 0;*/
  /*right: 0;*/
  /*left: 0;*/
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;

  display: flex;
}
.zw {
  flex: 1;
  height: 100%;
}

#tab-content {
  flex: 1;
  overflow: hidden;
}
</style>
