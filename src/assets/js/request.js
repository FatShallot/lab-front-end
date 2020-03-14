// 导入axios
import axios from './http'

// .then()里的参数data，已经经过了响应过滤器的拦截，实际上等于response.data
// .catch()里的参数data，已经经过了响应过滤器的拦截，实际上等于error.response.data
// 参数data里是后端自定义的数据，格式是code、msg、data
// resolve()和reject()里写data还是data.data结果是一样的

// 封装了一个get请求的方法
function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then(data => {
        resolve(data)
      })
      .catch(data => {
        reject(data)
      })
  })
}

// 封装了一个post请求的方法
function post(url, params) {
  // 请求体
  params.body = JSON.stringify(params.body)
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(data => {
        resolve(data)
      })
      .catch(data => {
        reject(data)
      })
  })
}

// 保存token
function saveToken(token) {
  axios.defaults.headers.common.Authorization = token
}

// 清除保存的token
function clearToken() {
  axios.defaults.headers.common.Authorization = ''
}

export default {
  saveToken,
  clearToken,
  get,
  post
}
