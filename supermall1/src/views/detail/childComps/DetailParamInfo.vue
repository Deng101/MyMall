<template>
  <div v-if="Object.keys(paramInfo).length !== 0" class="param-info">
      <table v-for="(table,index) in paramInfo.sizes" :key="index" class="info-size">
          <tr v-for="(tr,indey) in table" :key="indey">
              <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
          </tr>
      </table>
      <table class="info-param">
        <tr v-for="item in paramInfo.infos" >
          <td class="info-param-key">{{item.key}}</td>
          <td class="param-value">{{item.value}}</td>
        </tr>
      </table>
    <div v-if="paramInfo.image.length !== 0" class="info-img">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
.param-info{
  padding: 20px 15px;
  font-size: 15px;
  border-bottom: 5px solid #f2f5f8;
}
.param-info table{
  width: 100%;
  border-collapse: collapse;
}
.param-info table tr{
  height: 42px;
}
.param-info table tr td{
  border-bottom: 1px solid rgba(100,100,100,.1);
}
.info-param-key{
  /*防止value过大挤到key，因此给key设置固定值*/
  width: 95px;
}
.info-size{

}
.info-param{
  border-top: 1px solid rgba(0,0,0,.1);
}
.info-param-key{

}
.param-value{
  color: #eb4868;
}
.info-img img{
  width: 100%;
}
</style>
