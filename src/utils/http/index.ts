import clone from 'lodash-es/clone'
import { default as deepMerge } from 'lodash-es/merge'

// import { checkStatus } from './checkStatus'
import { getAppEnvConfig } from '@/utils/env'
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum'
import { isString } from '@/utils/is'
import { useUserStoreWithOut } from '@/store/user'
import { setObjToUrlParams } from '@/utils/utils'
import { useMessage } from '@/hooks/useMessage'
import { router } from '@/router/index'
import httpCode from './http-code'
import { formatRequestDate, joinTimestamp } from './helper'
import { nsAxios } from './Axios'
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
const globSetting = getAppEnvConfig()
const { createMessage, createErrorModal } = useMessage()

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (
    res: AxiosResponse<HTTP.Result>,
    options: HTTP.RequestOptions
  ) => {
    const { isTransformResponse, isReturnNativeResponse } = options
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data
    }
    // 错误的时候返回

    const { data: outData } = res || {}
    if (!outData) {
      throw new Error('请求出错，请稍后重试')
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, data, succeed } = outData

    // 这里逻辑可以根据项目进行修改
    if (succeed) {
      return data
    } else {
      if (code === 50014) {
        const userStore = useUserStoreWithOut()
        userStore.token = ''
        router.push({ name: 'login' })
        return
      }
      // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
      // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
      const errorMsg = httpCode[code] || '请求出错，请稍后重试'
      if (options.errorMessageMode === 'modal') {
        createErrorModal({ title: '错误提示', content: errorMsg })
      } else if (options.errorMessageMode === 'message') {
        createMessage.error(errorMsg)
      }
      throw new Error(errorMsg)
    }
  },

  // 请求之前处理config
  beforeRequestHook: (config: AxiosRequestConfig, options) => {
    const {
      apiUrl,
      joinParamsToUrl,
      formatDate,
      joinTime = true,
      formData = false
    } = options

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }

    const params = config.params || {}
    const data = config.data || false
    formatDate && data && !isString(data) && formatRequestDate(data)
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(
          params || {},
          joinTimestamp(joinTime, false)
        )
      } else {
        // 兼容restful风格
        config.url = `${config.url + params}${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else if (!isString(params)) {
      formatDate && formatRequestDate(params)
      if (
        Reflect.has(config, 'data') &&
        config.data &&
        Object.keys(config.data).length > 0
      ) {
        config.data = data
        config.params = params
      } else {
        // 非GET请求如果没有提供data，则将params视为data
        config.data = params
        config.params = undefined
      }
      if (joinParamsToUrl) {
        config.url = setObjToUrlParams(
          config.url as string,
          Object.assign({}, config.params, config.data)
        )
      }
    } else {
      // 兼容restful风格
      config.url = config.url + params
      config.params = undefined
    }
    if (formData) {
      config.headers = {
        ...(config.headers || {}),
        'Content-Type': ContentTypeEnum.FORM_URLENCODED
      }
    }
    return config
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config) => {
    // 请求之前处理config
    const userStore = useUserStoreWithOut()
    const token = userStore.token

    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      ;(config as Recordable).headers.token = token
    }
    return config
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    if (res.headers.token) {
      useUserStoreWithOut().token = res.headers.token
    }
    return res
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (_axiosInstance: AxiosResponse, error: any) => {
    const { code, message, config } = error || {}
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none'
    // const msg: string = response?.data?.error?.message ?? ''
    const err: string = error?.toString?.() ?? ''
    let errMessage = ''

    try {
      if (code === 'ECONNABORTED' && message.includes('timeout')) {
        errMessage = '请求超时，请刷新页面'
      }
      if (err?.includes('Network Error')) {
        errMessage = '网络异常，请检查您的网络链接是否正常'
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          createErrorModal({ content: errMessage, title: '错误提示' })
        } else if (errorMessageMode === 'message') {
          createMessage.error(errMessage)
        }
        return Promise.reject(error)
      }
    } catch (error) {
      throw new Error(error as unknown as string)
    }

    // checkStatus(error?.response?.status, msg, errorMessageMode)

    return Promise.reject(error)
  }
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new nsAxios(
    deepMerge(
      {
        authenticationScheme: '',
        timeout: -1,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 数据处理方式
        transform: clone(transform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          formData: false,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: globSetting.apiUrl,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true
        }
      },
      opt || {}
    )
  )
}
const http = createAxios()
export default http
