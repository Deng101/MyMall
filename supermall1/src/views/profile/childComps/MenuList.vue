<template>
  <div id="menu-list">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MenuList",
};
</script>

<style scoped>
#menu-list {
    display: flex;
}
</style>