// 导入axios
import axios from './http'
// import qs from 'qs'

// 封装了一个get请求的方法
function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    }).then((result) => {
      resolve(result.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 封装了一个post请求的方法
function post (url, params) {
  // 请求体
  params.body = JSON.stringify(params.body)
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}

// 保存token
function saveToken (token) {
  axios.defaults.headers.common.Authorization = token
}

// 清除保存的token
function clearToken () {
  axios.defaults.headers.common.Authorization = ''
}

export default {
  saveToken,
  clearToken,
  get,
  post
}
