<template>
  <div class="listview">
    <ul>
      <li>
        <a href="javascript:">
          <span>0</span>
          <span>关注</span>
        </a>
      </li>
      <li>
        <a href="javascript:">
          <span>0</span>
          <span>收藏夹</span>
        </a>
      </li>
      <li>
        <a href="javascript:">
          <span>0</span>
          <span>最近浏览</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ListView",
};
</script>

<style scoped>
ul {
  width: 80%;
  display: flex;
  list-style: none;
  margin: auto;
  padding-top: 10px;
  border-top: 1px solid #bfbaba;
}
ul li {
  flex: 1;
  text-align: center;
}
ul li:nth-child(2),
ul li:nth-child(3) {
  border-left: 1px solid #bfbaba;
}
ul li a {
  display: flex;
  flex-direction: column;
}
ul li a span {
  padding: 5px 0;
}
</style>
