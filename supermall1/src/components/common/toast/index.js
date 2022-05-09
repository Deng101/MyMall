import Toast from "./Toast";
import Vue from "vue";
const obj = {}

const toastContrustor = Vue.extend(Toast)

obj.install = function (Vue){
  // 1.创建组件构造器
  // 2.new的方式，根据组件构造器，可以创建出来的一个组件对象
  const toast = new toastContrustor()
  // 3.将组建对象，手动挂载到某个元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  // 这里设置属性注意是用  prototype 不是用 probetype，这里卡了我大半个钟
  // Vue.probeType.$toast = toast;
  Vue.prototype.$toast = toast
}
export default obj
