import { defineComponent } from 'vue'
import { FormItem } from 'ant-design-vue'
import {
  cloneDeep,
  isBoolean,
  isFunction,
  isNull,
  isString,
  pick
} from 'lodash-es'

import { vueTypes } from '@/utils/vueTypes'
import NsHelp from '../help/index.vue'
import { getSlot } from './../helper'
import { componentMap, otherComponents } from './componentMap'
import { useItemLabelWidth } from './hooks/useLabelWidth'
import type { NsForm, NsFormItem } from './types'
import type { PropType } from 'vue'
export default defineComponent({
  name: 'FormItem',
  props: {
    formModel: vueTypes.object.def({}),
    formItem: {
      type: Object as PropType<NsFormItem>,
      default: () => ({})
    },
    formProps: { type: Object as PropType<NsForm>, default: () => ({}) },
    type: vueTypes.string.def('normal')
  },

  setup(props, { slots }) {
    const realType = $computed(() => props.formItem.component)
    //更加类型获取对应组件
    const realComponent = realType
      ? (componentMap.get(realType) as ReturnType<typeof defineComponent>)
      : null

    //获取对应组件属性
    const getComponentProps = computed(() => {
      const type = realType || ''
      const comProps = realComponent.props || {}
      const comOtherProps = Reflect.has(otherComponents, type)
        ? Reflect.get(otherComponents, type).props
        : []
      const realComProps = [...Object.keys(comProps), ...comOtherProps]
      return pick(props.formItem, realComProps || [])
    })

    const getFormItemProps = $computed(() => {
      const allProps = props.formItem
      const formItemPropsKey = Object.keys(FormItem.props)
      const formItemProps = pick(allProps, formItemPropsKey)

      if (allProps.prop) {
        formItemProps.name = allProps.prop
        delete formItemProps.prop
      }
      return formItemProps
    })

    const getPlaceholderPrefix = computed(() => {
      const item = props.formItem
      if (item.component && item.component.includes('Input')) {
        return '请输入'
      } else {
        return '请选择'
      }
    })

    //设置Placeholder
    const getPlaceholder = computed(() => {
      const item = props.formItem
      const defaultPlaceholder = item.component?.includes('Range') ? [] : ''
      if (props.type !== 'searchForm') {
        return item.placeholder || defaultPlaceholder
      }
      return item.placeholder || item.label || defaultPlaceholder
    })

    //是否显示 v-show控制
    const isShow = $computed(() => {
      let realIsShow = true
      const show = props.formItem.show
      if (isBoolean(show)) {
        realIsShow = show
      }
      if (isFunction(show)) {
        realIsShow = show(props.formModel)
      }
      return realIsShow
    })

    //是否显示 v-if控制
    const isIfShow = computed(() => {
      let realIsIfShow = true
      const { ifShow } = props.formItem
      if (isBoolean(ifShow)) {
        realIsIfShow = ifShow
      }
      if (isFunction(ifShow)) {
        realIsIfShow = ifShow(props.formModel)
      }
      return realIsIfShow
    })

    function handleRules() {
      const { formItem, formModel } = props
      const { rules: defRules = [], label, required } = formItem
      if (isFunction(defRules)) {
        return defRules(unref(formModel))
      }
      const rules = cloneDeep(defRules)
      const defaultMsg = unref(getPlaceholderPrefix) + label
      function validator(rule: any, value: any) {
        const msg = rule.message || defaultMsg
        if (
          value === undefined ||
          isNull(value) ||
          (isString(value) && value.trim() === '')
        ) {
          return Promise.reject(msg)
        } else if (Array.isArray(value) && value.length === 0) {
          return Promise.reject(msg)
        }
        return Promise.resolve()
      }
      //规则中找不到required规则 就默认添加
      const getRequired = isFunction(required) ? required(formModel) : required
      const requiredrules = rules.find((rule) => Reflect.has(rule, 'required'))
      if (getRequired) {
        const rule = requiredrules || { required: getRequired, validator }
        rule.message ??= defaultMsg
        if (!requiredrules) {
          rules.push(rule)
        }
      }
      // let maxLengthRule = rules.find((val) => val.max)
      // if ((maxLengthRule && !maxLengthRule.validator) || (maxLength && isShowMaxlengthMsg)) {
      //   maxLengthRule ??= { max: maxLength }
      //   maxLengthRule.message ??= `字符数应小于${maxLengthRule.max}`
      // }
      return rules
    }
    //提示信息
    function renderTips() {
      const { tips, tipsProps } = props.formItem
      const getTips = isFunction(tips) ? tips(unref(props.formModel)) : tips
      if (!getTips || (Array.isArray(getTips) && getTips.length === 0)) {
        return null
      }
      return <NsHelp class="mx-1" text={getTips} {...tipsProps} />
    }

    //label渲染
    function renderLabelHelpMessage() {
      const {
        label,
        subLabel,
        tipsPlacement = 'label',
        component
      } = props.formItem
      const renderLabel = subLabel ? (
        <span>
          {label} <span class="text-secondary">{subLabel}</span>
        </span>
      ) : (
        label
      )

      return (
        <span>
          {renderLabel}
          {(tipsPlacement === 'label' || component === 'Divider') &&
            renderTips()}
        </span>
      )
    }

    //v-model绑定checked的组件
    const checkedComponents = ['Switch']
    const getInputComponentItem = function () {
      const { formItem, formModel } = props
      const { slot, contentSlot, component, prop } = formItem
      //组件插槽直接替代当前组件
      if (slot) {
        return getSlot(slots, formItem.slot, formModel)
      }

      //组件内插槽
      const realContentSlot = !contentSlot
        ? null
        : isFunction(contentSlot)
        ? { ...contentSlot(unref(formModel)) }
        : {
            default: () => contentSlot
          }

      if (component && prop) {
        return checkedComponents.includes(component) ? (
          <realComponent
            {...getComponentProps.value}
            v-model={[formModel[prop], 'checked']}
            placeholder={getPlaceholder.value}
          >
            {realContentSlot}
          </realComponent>
        ) : (
          <realComponent
            {...getComponentProps.value}
            v-model={[formModel[prop], 'value']}
            placeholder={getPlaceholder.value}
          >
            {realContentSlot}
          </realComponent>
        )
      }
      return null
    }

    const { formItem, formProps } = toRefs(props)

    const itemLabelWidthProp = useItemLabelWidth(formItem, formProps)

    return () => {
      const { formItem, formModel } = props
      const { tipsPlacement } = formItem
      const suffix = formItem.suffix
      console.log(formModel, 452)
      const getSuffix = isFunction(suffix) ? suffix(unref(formModel)) : suffix
      const { labelCol, wrapperCol } = unref(itemLabelWidthProp)

      return (
        isIfShow.value &&
        (formItem.component === 'Divider' ? (
          <realComponent orientation="left" {...unref(getComponentProps)}>
            {renderLabelHelpMessage()}
          </realComponent>
        ) : (
          <FormItem
            v-show={isShow}
            {...getFormItemProps}
            rules={handleRules()}
            label={renderLabelHelpMessage()}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
          >
            <div class="flex items-center">
              <div class="flex-1 ns-input-wraps">{getInputComponentItem()}</div>
              {getSuffix && <span>{getSuffix}</span>}
              {tipsPlacement === 'input' && renderTips()}
            </div>
          </FormItem>
        ))
      )
    }
  }
})
