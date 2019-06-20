import axios from 'axios'

// 全局默认请求头
// axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.get['Accept'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8'
// 全局请求拦截器
axios.interceptors.request.use(config => {
  return config
}, error => {
  console.log('请求错误')
  return Promise.reject(error)
})
// 全局响应拦截器
axios.interceptors.response.use(response => {
  return response
}, error => {
  console.log('响应错误')
  return Promise.reject(error)
})

export default {
  getHttp (urls, datas) { // get数据请求
    return axios({
      method: 'GET',
      url: urls,
      data: JSON.stringify(datas),
      timeout: 3000
    })
  }
}
