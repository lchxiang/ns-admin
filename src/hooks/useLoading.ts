/*
 * @Author: liwg
 * @Date: 2022-03-19 10:43:55
 * @LastEditors: liwg
 * @LastEditTime: 2022-06-29 19:40:50
 */
import type { Ref } from 'vue'

import { unref } from 'vue'

import type { LoadingProps } from '@/components/Loading/typing'
import { createLoading } from '@/components/Loading/createLoading'

export interface UseLoadingOptions {
  target?: any
  props?: Partial<LoadingProps>
}

export function useLoading(props: Partial<LoadingProps>): [Fn, Fn, (arg0: string) => void]
export function useLoading(opt: Partial<UseLoadingOptions>): [Fn, Fn, (arg0: string) => void]

export function useLoading(
  opt: Partial<LoadingProps> | Partial<UseLoadingOptions>
): [Fn, Fn, (arg0: string) => void] {
  let props: Partial<LoadingProps>
  let target: HTMLElement | Ref<ElRef> = document.body

  if (Reflect.has(opt, 'target') || Reflect.has(opt, 'props')) {
    const options = opt as Partial<UseLoadingOptions>
    props = options.props || {}
    target = options.target || document.body
  } else {
    props = opt as Partial<LoadingProps>
  }

  const instance = createLoading(props, undefined, true)

  const open = (): void => {
    const t = unref(target as Ref<ElRef>)
    if (!t) return
    instance.open(t)
  }

  const close = (): void => {
    instance.close()
  }

  const setTip = (tip: string) => {
    instance.setTip(tip)
  }

  return [open, close, setTip]
}
