import Vue from 'vue'
import VueRouter from 'vue-router'
// ./表示当前目录，../表示上一层路径
// 我的目录结构跟视频里的不一样，所以我应该使用../
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
}, {
  path: '/login',
  component: Login
}]

const router = new VueRouter({
  routes
})

export default router
