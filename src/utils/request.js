import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/cache'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000
})

service.interceptors.request.use(
  config => {

    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken();
    }
    return config
  },
  error => {

    return Promise.reject(error)
  }
)


service.interceptors.response.use(

  response => {
    const res = response.data
    let { Success, Code, Msg } = res;
    if (Success == true) {
      return res
    }
    else {

      if (Code == 500) {
        Message({
          message: Msg,
          type: 'error',
          duration: 5 * 1000
        })
        return res
      }
      else if (Code == 401) {
        Message({
          message: '用户信息已过期',
          type: 'error',
          duration: 5 * 1000
        })
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
        return Promise.reject(new Error(error || 'Error'))
      }
      else {
        return Promise.reject(new Error(Msg || 'Error'))
      }
    }

  },
  error => {
    if (error.message.indexOf("Network Error") != -1) {
      Message({
        message: '后端服务没有启动',
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject(new Error(error || 'Error'))
    }
    if (error.message.indexOf("401") != -1) {

      Message({
        message: '用户信息已过期',
        type: 'error',
        duration: 5 * 1000
      })
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
      return Promise.reject(new Error(error || 'Error'))
    }
    else if (error.message.indexOf("403") != -1) {
      Message({
        message: '用户没有该权限',
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject(new Error(error || 'Error'))
    }
    else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
