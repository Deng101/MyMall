import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import FastClick from 'fastclick'
import VueLazyLoad from "vue-lazyload";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont';


import toast from './components/common/toast'

Vue.config.productionTip = false
// Vue.prototype.$bus = new Vue()
Vue.use(toast)
Vue.use(ElementUI);

FastClick.attach(document.body)

// 使用懒加载
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
