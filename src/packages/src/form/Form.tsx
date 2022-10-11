import { lowerCase } from 'lodash-es'
import { deepMerge, getDynamicProps } from '@/utils/utils'
import { isNullOrUnDef } from '@/utils/is'
import { useFormEvents } from './hooks/useFormEvents'
import FormItem from './FormItem'
import { formProps } from './types'
import { getSlot } from './../helper'
import type { NsForm, NsFormExpose, NsFormItem } from './types'
export default defineComponent({
  name: 'NsForm',
  inheritAttrs: false,
  props: formProps,
  emits: ['update:modelValue', 'submit', 'reset', 'register'],
  setup(props, { emit, expose, slots }) {
    const innerProps = ref<Partial<NsForm>>({})
    const innerFormList = ref<Nullable<NsFormItem[]>>(null)
    const formRef = ref()
    const formModel = ref<Recordable>({})
    const defaultFormModel = ref<Recordable>({})
    const formModelKeyList = ref<string[]>([])
    let isInitDefaultValue = $ref<boolean>(false)
    const formItemRefs: Recordable = {}
    const setItemRef = (el: object | null, key: string) => {
      if (key && el) {
        formItemRefs[key] = el
      }
    }
    //手动设置属性值
    // eslint-disable-next-line require-await
    async function setProps(formProps: NsForm) {
      innerProps.value = deepMerge(unref(innerProps) || {}, formProps)
    }

    const realProps = $computed((): NsForm => {
      return {
        ...getDynamicProps(props),
        ...getDynamicProps(unref(innerProps))
      }
    })

    /**
     * 计算formList 主要区分查询表单以及普通表单
     * formList来源有两个 1、ref传入 2、useForm传入的formList
     * 此处formList取值第二种优先
     */
    const realFormList = computed((): NsFormItem[] => {
      const arr: NsFormItem[] = []
      const { formList, type } = realProps
      const list = unref(innerFormList) || formList
      if (list && list.length > 0) {
        list.forEach((ele: NsFormItem) => {
          const isBothUndefined =
            ele.isNormal === undefined && ele.isSearch === undefined
          if (
            (type === 'search' &&
              (isBothUndefined || !ele.isNormal) &&
              ele.type !== 'Divider') ||
            (type === 'normal' && (isBothUndefined || !ele.isSearch))
          ) {
            arr.push(ele)
          }
        })
      }
      return arr
    })

    //ref情况是监控传进来的formList进行改变
    watch(
      () => unref(realFormList),
      (val) => {
        if (val.length > 0) {
          initDefault()
          //useform传入并且formModel未初始化时 初始化一下
          if (
            props.formList.length === 0 &&
            Object.keys(formModel.value).length === 0
          ) {
            setFormValue({})
          }
        }
      },
      {
        immediate: true,
        deep: true
      }
    )

    // 初始化默认值
    function initDefault() {
      const formDefaultValue: Recordable = {}
      const keyList = new Set()
      const column = unref(realFormList)
      column.forEach(
        ({ prop = '', slot, colSlot, component, form = {}, defaultValue }) => {
          if (component === 'Divider') return
          if (prop) {
            keyList.add(prop)
            if (!isNullOrUnDef(defaultValue))
              formDefaultValue[prop] = defaultValue
          }
          if ((slot || colSlot) && form && JSON.stringify(form) !== '{}') {
            Object.entries(form).forEach(([key, value]) => {
              keyList.add(key)
              if (!isNullOrUnDef(value)) {
                formDefaultValue[key] = value
              }
            })
          }
        }
      )
      defaultFormModel.value = formDefaultValue
      formModelKeyList.value = [...keyList] as string[]
      isInitDefaultValue = true
    }

    const {
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
    } = useFormEvents({
      realProps: $$(realProps),
      innerFormList,
      emit,
      formModel,
      realFormList,
      defaultFormModel,
      formModelKeyList,
      formRef,
      formItemRefs
    })

    //监控formModel
    watch(
      formModel,
      (val) => {
        emit('update:modelValue', val)
      },
      {
        deep: true
      }
    )

    const { modelValue } = toRefs(props)
    watchEffect(async () => {
      if (modelValue.value) {
        await nextTick()
        setFormValue(modelValue.value)
      }
    })

    provide('$nsForm', {
      formModel: computed(() => formModel.value)
    })

    const methods = {
      setProps,
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

    const isRegister = ref(false)
    onMounted(() => {
      if (!isRegister.value) {
        initDefault()
        emit('register', methods)
      }
      isRegister.value = true
    })

    expose({
      validate,
      validateFields,
      clearValidate,
      resetFormValue
    } as NsFormExpose)

    const getFormClass = $computed(() => {
      return ['ns-form', `ns-form-${props.type}`, props.class || '']
    })

    return () => {
      const isRender = unref(realFormList) && unref(realFormList).length > 0
      const renderCol = (formItem: NsFormItem) => {
        const colClassName = [
          `ns-item-container ${formItem.class || ''}`,
          `item-type-${lowerCase(formItem.component || 'input')}`,
          formItem.multiple ? 'multiple' : ''
        ]
        const itemSlot = formItem.slot
          ? {
              [formItem.slot]: () =>
                getSlot(slots, formItem.slot, formModel.value)
            }
          : null
        return (
          <a-col span={formItem.span || 24} class={colClassName}>
            {formItem.colSlot ? (
              slots[formItem.colSlot]?.()
            ) : (
              <FormItem
                ref={(el) => {
                  setItemRef(el, formItem.prop as string)
                }}
                form-item={formItem}
                form-model={formModel.value}
                form-props={realProps}
                v-slots={itemSlot}
              ></FormItem>
            )}
          </a-col>
        )
      }
      const renderForm = () => {
        const { disabled, validateOnRuleChange } = props
        return (
          isInitDefaultValue && (
            <a-form
              ref="formRef"
              model={formModel}
              disabled={disabled}
              validateOnRuleChange={validateOnRuleChange}
            >
              <a-row gutter={20} class="form-row" span={24}>
                {unref(realFormList).map((formItem) => renderCol(formItem))}
              </a-row>
              {getSlot(slots, 'btn', formModel.value)}
            </a-form>
          )
        )
      }
      return isRender && <div class={getFormClass}>{renderForm()}</div>
    }
  }
})
