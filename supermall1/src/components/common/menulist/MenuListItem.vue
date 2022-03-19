<template>
    <div class="menu-list-item">
        <div><slot class="item-icon" name="item-icon"></slot></div>
        <div><slot class="item-text" name="item-text"></slot></div>
    </div>
</template>

<script>
export default {
    name: 'MenuListItem'
}
</script>

<style scoped>
.menu-list-item{
    flex: 1;
    text-align: center;
    font-size: 14px;
    width: 50px;
    height: 50px;
}
.menu-list-item svg,i{
    width: 24px;
    height: 24px;
    margin: 3px 0;
}
</style>