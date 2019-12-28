import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/css/index.css'
import './assets/css/font-awesome.min.css'
Vue.prototype.axios=axios
Vue.config.productionTip = false

import Router from 'vue-router'
const routerPush = Router.prototype.push
  Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}


axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

// // 创建实例时设置配置的默认值
// var instance = axios.create({
//   baseURL: 'https://localhost:8080'
// });

// // 在实例已创建后修改默认值
// instance.defaults.headers.common['Authorization'] = "1111111";
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
