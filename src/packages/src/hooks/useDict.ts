import { computed, ref, unref, watchEffect } from 'vue'
import http from '@/utils/http'
import { isBoolean, isNumber, isObject, isString } from '@/utils/is'
import { getValueByPath } from '../helper'
import { useNsProviderContext } from './useNsContext'

import type { DictProps } from '../dict-props'
export function useDict(props: DictProps) {
  const { labelKey: gLabelKey, valueKey: gValueKey } = $(useNsProviderContext())
  const innerDicData = ref<unknown[]>([])
  const { url, proxy, ajaxData, resultPath } = props
  //格式化字典数据 支持[1,2,3,4]这种字典数据
  const formatterDicData = computed(() => {
    const {
      options = [],
      url,
      labelKey = gLabelKey,
      valueKey = gValueKey
    } = props
    const realDicData: Recordable = url || proxy ? unref(innerDicData) : options
    const first = realDicData[0]
    if (realDicData.length > 0 && isObject(first)) {
      return realDicData || []
    } else if (
      realDicData.length > 0 &&
      (isString(first) || isNumber(first) || isBoolean(first))
    ) {
      return realDicData.map((item: string | number | Boolean) => {
        return {
          [labelKey]: item,
          [valueKey]: item
        }
      })
    }
    return realDicData || []
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

  return {
    formatterDicData
  }
}
