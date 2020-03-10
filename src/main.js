import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'

// 导入axios
import axios from 'axios'
// 设置请求的根路径，就是后台路径
// 这里最后加了一个/，调用的时候，直接写login，而不用写/login
axios.defaults.baseURL = 'http://localhost:10010/'
// 将axios挂载到Vue原型的$http属性上
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
