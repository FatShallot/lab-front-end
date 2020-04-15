import Vue from 'vue'
// 导入axios
import axios from 'axios'

// 导入加载进度条nprogerss
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 设置请求的根路径，就是后台路径
// 这里最后加了一个/，调用的时候，直接写login，而不用写/login
axios.defaults.baseURL = 'http://localhost:10010/'

// 请求拦截器
axios.interceptors.request.use(request => {
  // 显示进度条
  Nprogress.start()
  request.headers.Authorization = window.sessionStorage.getItem('jwt')
  return request
})

// 响应拦截器
// 正常消息：response里有status和data，data里有后端返回的自定义数据，数据里有code、msg、data、isSuccessful
// 异常消息：error里有response
axios.interceptors.response.use(
  response => {
    // 隐藏进度条
    Nprogress.done()

    // 正常状态
    if (response.data.successful) {
      // 如果响应里携带了token，就将这个token保存到要向后传递的数据中
      if (response.headers.authorization) {
        response.data.token = response.headers.authorization
      }
      return response.data
    } else {
      Vue.prototype.$message.error('操作失败，请重试')
      return response.data
    }
  },
  error => {
    // 我们可以在这里对异常状态作统一处理
    // 这里的处理逻辑还要再修改
    const { response } = error
    if (response) {
      // 如果服务器返回结果了
      // 提示错误信息
      if (response.data.msg) {
        return Vue.prototype.$message.error(response.data.msg)
      } else {
        return Vue.prototype.$message.error(response.message)
      }
      // 这里可以进一步判断响应状态码，做相应的处理
    } else {
      // 如果服务器没有返回结果
      if (!window.navigator.onLine) {
        // 做断网处理
        return Vue.prototype.$message.error(response.data.msg)
      }
    }
    // 向后面的处理返回一个data
    return response.data
  }
)

export default axios
