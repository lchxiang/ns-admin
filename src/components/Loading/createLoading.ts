/*
 * @Author: liwg
 * @Date: 2022-03-19 10:43:55
 * @LastEditors: liwg
 * @LastEditTime: 2022-03-19 10:52:03
 */
import type { LoadingProps } from './typing'

import { VNode, defineComponent, h, reactive, createVNode, render } from 'vue'

import Loading from './Loading.vue'
export function createLoading(props: Partial<LoadingProps>, target?: HTMLElement, wait = false) {
  let vm: Nullable<VNode> = null
  const data = reactive({
    tips: '',
    loading: true,
    ...props
  })
  const loadingWrap = defineComponent({
    render() {
      return h(Loading, { ...data })
    }
  })
  vm = createVNode(loadingWrap)
  // vnod=>HTMLElement
  if (wait) {
    setTimeout(() => {
      render(vm, document.createElement('div'))
    }, 0)
  } else {
    render(vm, document.createElement('div'))
  }

  function close() {
    if (vm?.el && vm.el.parentNode) {
      vm.el.parentNode.removeChild(vm.el)
    }
  }

  function open(target: HTMLElement = document.body) {
    if (!vm || !vm.el) {
      return
    }
    target.appendChild(vm.el as HTMLElement)
  }

  if (target) {
    open(target)
  }

  return {
    vm,
    close,
    open,
    setTip: (tip: string) => {
      data.tip = tip
    },
    setLoading: (loading: boolean) => {
      data.loading = loading
    },
    get loading() {
      return data.loading
    },
    get $el() {
      return vm?.el as HTMLElement
    }
  }
}
