import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入axios
import axios from 'axios'
// 导入封装好的4个请求方法
import Request from './assets/js/request'
// 导入自定义的vuex
import Store from './vuex/store'

// 将自定义的vuex store挂载到原型上
Vue.prototype.$store = Store

// 设置请求的根路径，就是后台路径
// 这里最后加了一个/，调用的时候，直接写login，而不用写/login
axios.defaults.baseURL = 'http://localhost:10010/'
// 将axios挂载到Vue原型的$http属性上
Vue.prototype.$http = axios

// 挂载到Vue原型上
// 原型上的$request是自定义的命名，后面使用的时候保持一致即可
Vue.prototype.$request = Request

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
