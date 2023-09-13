import { BASE_URL, TIME_OUT } from './config'
import Request from './request'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'

// 创建请求实例（可以创建多个配置不同的实例）
export const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,

  // 因为可以创建多个请求实例，所以要考虑为某一特定实例单独配置拦截器
  // 因为原本传递的类型中没有interceptors（拦截器）这个属性, 我们就要针对于原本类型进行拓展
  interceptors: {
    requestSuccessFn: (config) => {
      // 每一个请求都自动携带token
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        // 类型缩小 (注意Bearer后面有空格)
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    },
    requestFailureFn: (err) => {
      return err
    },
    responseSuccessFn: (res) => {
      return res
    },
    responseFailureFn: (err) => {
      return err
    }
  }
})

export default request
