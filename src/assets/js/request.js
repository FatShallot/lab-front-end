// 导入axios
import axios from './http'
import qs from 'qs'

// .then()里的参数data，已经经过了响应过滤器的拦截，实际上等于response.data
// .catch()里的参数data，已经经过了响应过滤器的拦截，实际上等于error.response.data
// 参数data里是后端自定义的数据，格式是code、msg、data
// resolve()和reject()里写data还是data.data结果是一样的

// 封装了一个get请求的方法
function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then(data => {
        resolve(data)
      })
      .catch(data => {
        reject(data)
      })
  })
}

// 封装了一个post请求的方法
function postWithBody(url, params) {
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

function postWithParam(url, params) {
  params = qs.stringify(params)
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

function putWithParam(url, params) {
  params = qs.stringify(params)
  return new Promise((resolve, reject) => {
    axios
      .put(url, params)
      .then(data => {
        resolve(data)
      })
      .catch(data => {
        reject(data)
      })
  })
}

function putWithBody(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, params)
      .then(data => {
        resolve(data)
      })
      .catch(data => {
        reject(data)
      })
  })
}

function deleteWithParam(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
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

export default {
  get,
  postWithBody,
  postWithParam,
  putWithParam,
  putWithBody,
  deleteWithParam
}
