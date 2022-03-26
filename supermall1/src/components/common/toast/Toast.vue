<template>
  <div class="toast" v-show="show">{{message}}</div>
</template>

<script>
export default {
name: "Toast",
  props: {

  },
  data(){
    return{
      message: '',
      show: false
    }
  },
  methods: {
    showToast(message,duration = 2000){
      this.message = message
      this.show = true

      setTimeout(() => {
        this.message = ''
        this.show = false
      },duration)
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  transform: translate(-50%, -50%);
  color: #fff;
  background-color: rgba(0,0,0,.75);

  z-index: 9999;
}
</style>
