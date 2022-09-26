import { computed, ref, unref, watchEffect } from 'vue'
import isPlainObject from 'lodash-es/isPlainObject'

import { getValueByPath } from '../helper'
import http from '@/utils/http'

// import  { EmitFn } from 'vue'
export function useDict(props: Recordable) {
  const innerDicData = ref<unknown[]>([])
  const { url, proxy, ajaxData, resultPath } = props
  //格式化字典数据 支持[1,2,3,4]这种字典数据
  const formatterDicData = computed(() => {
    const { options = [], url, labelKey, valueKey } = props
    const realDicData = url || proxy ? unref(innerDicData) : options
    if (realDicData.length && isPlainObject(realDicData[0])) {
      return realDicData || []
    }
    return realDicData.map((item: string | number | Boolean) => {
      return {
        [labelKey]: item,
        [valueKey]: item
      }
    })
  })

  //内部请求字典数据
  watchEffect(async () => {
    if (!url || !proxy) innerDicData.value = []
    let list = []
    if (proxy) {
      list = await proxy(props)
    } else if (url) {
      const res = await http.post({
        url,
        data: ajaxData
      })
      list = getValueByPath(res, unref(resultPath))
    }
    innerDicData.value = list || []
  })

  //   const realLableKey = computed(() => {
  //     const { dicUrl, labelKey } = props
  //     if (dicUrl.includes('sysDictDetail')) {
  //       return 'dictName'
  //     }
  //     return labelKey
  //   })

  //   const realListKey = computed(() => {
  //     const { dicUrl, ajaxData, listKey } = props
  //     return dicUrl.includes('sysDictDetail') ? `data.${ajaxData[0]}` : listKey
  //   })

  //   const realValueKey = computed(() => {
  //     const { dicUrl, valueKey } = props
  //     return dicUrl.includes('sysDictDetail') ? 'dictCode' : valueKey
  //   })

  return {
    formatterDicData
  }
}
