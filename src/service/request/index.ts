import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestConfig } from './type'

// 拦截器作用: loading/token/修改配置

/**
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型的问题)
 */

class Request {
  instance: AxiosInstance

  // request实例 => axios的实例
  constructor(config: RequestConfig) {
    this.instance = axios.create(config)

    // 1. 为每个instance实例都添加拦截器
    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 全局请求成功的拦截, 在此拿到传入的配置并且可以对其进行修改(loading/token)，然后将修改后的值返回
        return config
      },
      (err) => {
        // 全局请求失败的拦截
        return err
      }
    )


    // 2. 针对特定的Request实例添加拦截器
    // 如果config中有传入拦截器, 则为这一实例添加特定拦截器
    if (config.interceptors) {
      this.instance.interceptors.request.use(
        config.interceptors.requestSuccessFn as any,
        config.interceptors.requestFailureFn
      )
      this.instance.interceptors.response.use(
        config.interceptors.responseSuccessFn,
        config.interceptors.responseFailureFn
      )
    }

    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        // 全局响应成功的拦截
        return res.data
      },
      (err) => {
        // 全局响应失败的拦截
        return err
      }
    )
  }

  // 封装网络请求的方法
  request<T = any>(config: RequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance.request<any, T>(config)
        .then((res) => {
          // 单次响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default Request
