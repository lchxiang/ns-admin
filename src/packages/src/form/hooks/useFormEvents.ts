import { nextTick, toRaw, unref } from 'vue'
import { cloneDeep, isArray, isEqual } from 'lodash-es'
import { deepMerge } from '@/utils/utils'
import { isObject } from '@/utils/is'
import type { ComputedRef, Ref } from 'vue'
import type { FormActionType, NsForm, NsFormItem } from './../types/form'
import type { NamePath } from 'ant-design-vue/lib/form/interface'

interface UseFormEvents {
  emit: (
    event: 'submit' | 'reset' | 'update:modelValue' | 'register',
    ...args: any[]
  ) => void
  innerFormList: Ref<Nullable<NsFormItem[]>>
  realProps: ComputedRef<Partial<NsForm>>
  realFormList: ComputedRef<NsFormItem[]>
  formModel: Recordable
  formRef: Ref<FormActionType>
  formItemRefs: Recordable<Ref>
  defaultFormModel: Recordable
  formModelKeyList: Ref<string[]>
}

export function useFormEvents({
  innerFormList,
  realProps,
  realFormList,
  emit,
  formModel,
  defaultFormModel,
  formModelKeyList,
  formRef,
  formItemRefs
}: UseFormEvents) {
  //查询
  function submit() {
    const params = unref(realProps).formFormat
      ? unref(realProps).formFormat?.(formModel.value)
      : formModel.value
    emit('submit', params)
  }

  //重置表单数据
  function resetFormValue() {
    const defaultValue = JSON.parse(JSON.stringify(defaultFormModel.value))
    Object.entries(defaultValue).forEach(([key, value]: [string, any]) => {
      formModel.value[key] = value
      nextTick(() => {
        unref(formItemRefs?.[key])?.triggerEvent?.(value)
      })
    })
    setTimeout(() => {
      clearValidate()
    })
    emit('reset')
  }

  // 设置表单数据
  // eslint-disable-next-line require-await
  async function setFormValue(values: Recordable) {
    if (Object.keys(defaultFormModel.value).length === 0) return
    // const { modelValue } = unref(realProps)
    //TODO: ref使用时  防止重复同步数据  同步到完全一致不再同步 后续其他方案
    if (
      isEqual(values, formModel.value) &&
      Object.keys(formModel.value).length > 0
    )
      return
    if (JSON.stringify(values) === '{}') {
      resetFormValue()
    } else if (values) {
      Object.entries(values).forEach(([key, val]) => {
        if (
          formModelKeyList.value.includes(key) &&
          val !== null &&
          val !== undefined
        ) {
          formModel.value[key] = val
          nextTick(() => {
            unref(formItemRefs?.[key])?.triggerEvent?.(val)
          })
        }
      })
    }
  }

  //获取表单数据
  function getFormValue() {
    return toRaw(formModel.value)
  }

  //表单校验
  function validate(nameList?: NamePath[] | undefined) {
    return formRef.value.validate(nameList)
  }

  //校验指定属性
  function validateFields(namePath?: NamePath[]) {
    formRef.value.validateFields(namePath)
  }

  //清楚校验
  function clearValidate(props?: string | string[]) {
    formRef.value?.clearValidate?.(props)
  }

  //大杀器遍历更新
  function mapFormItem(callback: Fn) {
    const formList = cloneDeep(unref(realFormList))
    const updateFormList = formList.map((item, index) => callback(item, index))
    innerFormList.value = updateFormList
  }

  function updateFormList(data: Partial<NsFormItem> | Partial<NsFormItem>[]) {
    const list: Partial<NsFormItem>[] = isObject(data)
      ? [data]
      : isArray(data)
      ? [...data]
      : []
    const formList: Partial<NsFormItem>[] = []
    unref(realFormList).forEach((item) => {
      const updateItem = list.find(
        (citem) =>
          (Reflect.has(citem, 'prop') && citem.prop === item.prop) ||
          (Reflect.has(citem, 'updateKey') &&
            citem.updateKey === item.updateKey)
      )
      if (updateItem) {
        formList.push(deepMerge(item, updateItem))
      } else {
        formList.push(item)
      }
    })
    innerFormList.value = formList
  }

  function resetFormList(data: Partial<NsFormItem> | Partial<NsFormItem>[]) {
    const list = isObject(data) ? [data] : isArray(data) ? [...data] : []
    innerFormList.value = list
  }

  function removeFormListByField() {
    console.log(1)
  }

  function appendFormListByField() {
    console.log(1)
  }

  return {
    submit,
    clearValidate,
    validateFields,
    validate,
    resetFormValue,
    setFormValue,
    getFormValue,
    updateFormList,
    resetFormList,
    removeFormListByField,
    appendFormListByField,
    mapFormItem
  }
}
