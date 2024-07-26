import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
// @ts-ignore
import get from 'lodash/get'
import { ElMessage } from 'element-plus' //ElMessage
import { useUserStore } from '@/stores'
declare module 'axios' {
  export interface AxiosRequestConfig {}
}

export const baseURL = '/api'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: baseURL, // process.env.VUE_APP_BASE_URL
  timeout: 35000 // 请求超时时间
})

// 异常拦截处理器
interface Error {
  [propName: string]: any
}
const errorHandler = (error: Error) => {
  const status = get(error, 'response.status')
  let message
  switch (status) {
    case 400:
      message = '请求错误'
      break
    case 201:
    case 401: {
      message = '登录失效,请重新登录'
      // clearSession()
      // window.location.href = '/'
      break
    }
    case 403:
      message = '拒绝访问'
      break
    case 404:
      message = `请求地址出错: ${error.response.config.url}`
      break
    case 408:
      message = '请求超时'
      break
    case 500:
      message = '服务器内部错误'
      break
    case 501:
      message = '服务未实现'
      break
    case 502:
      message = '网关错误'
      break
    case 503:
      message = '服务不可用'
      break
    case 504:
      message = '网关超时'
      break
    case 505:
      message = 'HTTP版本不受支持'
      break
    default:
      break
  }
  if (message) {
    ElMessage.error(message)
  }
  return Promise.reject(error)
}

interface Config extends InternalAxiosRequestConfig<any> {
  [propName: string]: any
}
// request interceptor
request.interceptors.request.use((config: Config) => {
  const { token, sessionCheck } = useUserStore()

  if (sessionCheck()) {
    config.headers['token'] = token
    config.headers.Authorization = token
  }

  return config
}, errorHandler)

interface Response {
  [propName: string]: any
}
// response interceptor
request.interceptors.response.use((response: Response) => {
  // 响应头content-type为流, 直接返回
  if (/octet-stream/.test(response.headers['content-type'])) {
    return response
  }

  if (!response?.data || response?.data?.status === 200) {
    return response.data
  } else if (response.data instanceof Blob) {
    return response
  }
  if (response?.data?.msg) {
    ElMessage.error({
      message: response.data.msg
    })
  }
  return Promise.reject(response.data)
}, errorHandler)
export default request
