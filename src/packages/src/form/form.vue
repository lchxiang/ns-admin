<template>
  <div
    v-if="realFormList && realFormList.length"
    :class="['ns-form', type === 'searchForm' ? 'ns-form--search' : 'ns-form--normal']">
    <a-form
      v-if="isInitDefaultValue"
      ref="formRef"
      :model="formModel"
      :disabled="disabled"
      :validate-on-rule-change="validateOnRuleChange">
      <a-row :gutter="20" class="form-row" :span="24">
        <template
          v-for="formItem in realFormList"
          :key="formItem.prop || formItem.slot || formItem.colSlot">
          <a-col
            :span="formItem.span || 24"
            :class="[
              `${formItem.class || ''}`,
              `ns-item-container  item-type-${formItem.type || 'text'}`,
              type === 'searchForm' ? 'ns-search-item-container' : '',
              formItem.multiple ? 'multiple' : ''
            ]">
            <template v-if="formItem.colSlot">
              <slot :name="formItem.colSlot" v-bind="{ formModel } || {}"></slot>
            </template>
            <FormItem
              v-else
              :ref="
                (el: object | null) => {
                  setItemRef(el, formItem.prop as string)
                }
              "
              :type="realProps.type"
              :form-item="formItem"
              :form-model="formModel"
              :form-props="realProps">
              <!-- <template v-if="formItem.slot" #[formItem.slot]>
                <slot :name="formItem.slot" v-bind="{ formModel } || {}"></slot>
              </template> -->
            </FormItem>
          </a-col>
        </template>

        <a-col :span="24" class="search-btn-container">
          <!-- 表格查询按钮 -->
          <template v-if="type === 'searchForm'">
            <slot name="searchBtn">
              <a-button
                v-if="searchBtn.show !== false"
                type="primary"
                class="btn-confirm"
                circle
                :loading="searchLoading"
                :size="searchBtn && searchBtn.size"
                @click="submit">
                {{ searchBtn.text || '查询' }}
              </a-button>
              <a-button
                v-if="resetBtn.show !== false"
                class="btn-cancel"
                circle
                :loading="searchLoading"
                :size="resetBtn.size"
                @click="resetFormValue">
                {{ resetBtn.text || '重置' }}
              </a-button>
            </slot>
          </template>
          <slot name="extraBtn" />
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script setup lang="ts">
  import { useFormEvents } from './hooks/useFormEvents'
  import FormItem from './form-item.vue'
  import baseProps from './props'
  import { NsForm, NsFormItem } from './types/form'
  import { deepMerge, getDynamicProps } from '@/utils/utils'
  import { isNullOrUnDef } from '@/utils/is'

  defineOptions({
    name: 'NsForm'
  })

  const emit = defineEmits(['update:modelValue', 'submit', 'reset', 'register'])

  const props = defineProps(baseProps)

  const innerPropsRef = ref<Partial<NsForm>>({})
  const innerFormListRef = ref<Nullable<NsFormItem[]>>(null)
  const formRef = ref()
  const formModel = ref<Recordable>({})
  const defaultFormModel = ref<Recordable>({})
  const formModelKeyList = ref<string[]>([])
  const isInitDefaultValue = ref<boolean>(false)
  const formItemRefs: Recordable = {}
  const setItemRef = (el: object | null, key: string) => {
    if (key && el) {
      formItemRefs[key] = el
    }
  }
  const realProps = computed((): NsForm => {
    return { ...getDynamicProps(props), ...getDynamicProps(unref(innerPropsRef)) }
  })

  /**
   * 计算formList 主要区分查询表单以及普通表单
   * formList来源有两个 1、ref传入 2、useForm传入的formList
   * 此处formList取值第二种优先
   */
  const realFormList = computed((): NsFormItem[] => {
    const arr: NsFormItem[] = []
    const { formList, type } = unref(realProps)
    const list = unref(innerFormListRef) || formList
    if (list && list.length) {
      list.forEach((ele: NsFormItem) => {
        const isBothUndefined = ele.isNormal === undefined && ele.isSearch === undefined
        if (
          (type === 'searchForm' && (isBothUndefined || !ele.isNormal) && ele.type !== 'Divider') ||
          (type === 'normalForm' && (isBothUndefined || !ele.isSearch))
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
      if (val.length) {
        initDefault()
        //useform传入并且formModel未初始化时 初始化一下
        if (!props.formList.length && !Object.keys(formModel.value).length) {
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
    column.forEach(({ prop = '', slot, colSlot, component, form = {}, defaultValue }) => {
      if (component === 'Divider') return
      if (prop) {
        keyList.add(prop)
        if (!isNullOrUnDef(defaultValue)) formDefaultValue[prop] = defaultValue
      }
      console.log(form, 521)
      if ((slot || colSlot) && form && JSON.stringify(form) !== '{}') {
        Object.entries(form).forEach(([key, value]) => {
          keyList.add(key)
          if (!isNullOrUnDef(value)) {
            formDefaultValue[key] = value
          }
        })
      }
    })
    console.log(formDefaultValue, 520, keyList)
    defaultFormModel.value = formDefaultValue
    formModelKeyList.value = [...keyList] as string[]
    isInitDefaultValue.value = true
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
    realProps,
    innerFormListRef,
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

  //ref用法 监控外部赋值时同步
  // watch(
  //   () => props.modelValue,
  //   (val) => {
  //     if (!val) return
  //     setFormValue(val)
  //   },
  //   {
  //     deep: true,
  //     immediate: true,
  //   },
  // )
  const { modelValue } = toRefs(props)
  watchEffect(async () => {
    if (modelValue.value) {
      await nextTick()
      setFormValue(modelValue.value)
    }
  })

  //手动设置属性值
  async function setProps(formProps: NsForm) {
    innerPropsRef.value = deepMerge(unref(innerPropsRef) || {}, formProps)
  }
  const isRegister = ref(false)

  //特殊处理  处于弹窗中的表单 弹窗关闭后自动 重置数据
  //   const nsDialog: Recordable | undefined = inject('$NsDialog', undefined)
  //   let stopWatchNsDialog
  //   if (nsDialog) {
  //     stopWatchNsDialog?.()
  //     stopWatchNsDialog = watch(
  //       () => unref(nsDialog.show),
  //       (val, oldVal) => {
  //         if (oldVal && !val && unref(nsDialog.isResetInnerForm)) {
  //           setFormValue({})
  //         }

  //       },
  //     )
  //   }

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

  onMounted(() => {
    if (!isRegister.value) {
      initDefault()
      emit('register', methods)
    }
    isRegister.value = true
  })

  defineExpose({
    validate,
    validateFields,
    clearValidate,
    resetFormValue
  })
</script>
<style lang="scss" scoped></style>
