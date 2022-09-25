/*
 * @description:
 * @Author: liwg
 * @Date: 2022-04-09 14:38:25
 * @LastEditors: liwg
 * @LastEditTime: 2022-07-12 15:45:52
 */
/**
 * Data processing class, can be configured according to the project
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string
  transform?: AxiosTransform
  requestOptions?: HTTP.RequestOptions
}

export abstract class AxiosTransform {
  /**
   * @description: Process configuration before request
   * @description: Process configuration before request
   */
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: HTTP.RequestOptions
  ) => AxiosRequestConfig

  /**
   * @description: Request successfully processed
   */
  transformRequestHook?: (
    res: AxiosResponse<HTTP.Result>,
    options: HTTP.RequestOptions
  ) => any

  /**
   * @description: 请求失败处理
   */
  requestCatchHook?: (e: Error, options: HTTP.RequestOptions) => Promise<any>

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions
  ) => AxiosRequestConfig

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (
    axiosInstance: AxiosResponse,
    error: Error
  ) => void
}
