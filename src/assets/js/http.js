import Vue from 'vue'
// 导入axios
import axios from 'axios'
// import qs from 'qs'

// 设置请求的根路径，就是后台路径
// 这里最后加了一个/，调用的时候，直接写login，而不用写/login
axios.defaults.baseURL = 'http://localhost:10010/'
// 把请求参数变成一个对象
// axios.defaults.transformRequest = data => qs.stringify(data)

// 响应拦截器
// 正常消息：response里有status和data，data里有后端返回的自定义数据，数据里有code、msg、data
// 异常消息：error里有response
axios.interceptors.response.use(
  response => {
    // 如果返回的自定义状态码为2000，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.data.code === 2000) {
      // 正常状态
      // 如果响应里携带了token，就将这个token保存到要向后传递的数据中
      if (response.headers.authorization) {
        response.data.token = response.headers.authorization
      }
      return response.data
    } else {
      // 存在异常
      Vue.prototype.$message.error(response.data.msg)
      // 向后面的处理返回一个data
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
      Vue.prototype.$message.error(response)
      if (response.data.msg) {
        Vue.prototype.$message.error(response.data.msg)
      } else {
        Vue.prototype.$message.error(response.message)
      }
      // 这里可以进一步判断响应状态码，做相应的处理
    } else {
      // 如果服务器没有返回结果
      if (!window.navigator.onLine) {
        // 做断网处理
        Vue.prototype.$message.error(response.data.msg)
      }
    }
    // 向后面的处理返回一个data
    return response.data
  }
)

export default axios
