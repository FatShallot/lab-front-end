import Vue from 'vue'
import VueRouter from 'vue-router'
// ./表示当前目录，../表示上一层路径
// 我的目录结构跟视频里的不一样，所以我应该使用../
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Password from '../components/Password.vue'
import User from '../components/User.vue'
import Student from '../components/Student.vue'
import Status from '../components/Status.vue'
import LeaveApplication from '../components/LeaveApplication.vue'
import CheckLeaveApplication from '../components/CheckLeaveApplication.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    // 设置子路由规则
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/password',
        component: Password
      },
      {
        path: '/users',
        component: User
      },
      {
        path: '/students',
        component: Student
      },
      {
        path: '/status',
        component: Status
      },
      {
        path: '/leave_applications',
        component: LeaveApplication
      },
      {
        path: '/check_leave_applications',
        component: CheckLeaveApplication
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// next是一个函数
// next()表示放行
// next('/login')表示跳转到/login
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    // 如果是登录页面
    next()
  } else {
    // 取出jwt，根据jwt判断是否已登录
    const jwt = window.sessionStorage.getItem('jwt')
    if (jwt) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
