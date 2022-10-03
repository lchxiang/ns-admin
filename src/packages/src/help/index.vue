<script lang="tsx">
import { computed, defineComponent, unref } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { InfoCircleOutlined } from '@ant-design/icons-vue'

import { getPopupContainer } from '@/utils'
import { isArray, isString } from '@/utils/is'
import { vueTypes } from '@/utils/vueTypes'
import { getSlot } from '../helper'
import type { CSSProperties, PropType } from 'vue'

const props = {
  maxWidth: vueTypes.string.def('600px'),
  showIndex: vueTypes.bool,
  color: vueTypes.string.def('#ffffff'),
  fontSize: vueTypes.string.def('14px'),
  placement: vueTypes.string.def('right'),
  text: { type: [Array, String] as PropType<string[] | string> }
}

export default defineComponent({
  name: 'NsHelp',
  components: { Tooltip },
  props,
  setup(props, { slots }) {
    const getTooltipStyle = computed(
      (): CSSProperties => ({ color: props.color, fontSize: props.fontSize })
    )

    const getOverlayStyle = computed(
      (): CSSProperties => ({ maxWidth: props.maxWidth })
    )

    function renderTitle() {
      const textList = props.text

      if (isString(textList)) {
        return <p>{textList}</p>
      }

      if (isArray(textList)) {
        return textList.map((text, index) => {
          return (
            <p key={text}>
              <>
                {props.showIndex ? `${index + 1}. ` : ''}
                {text}
              </>
            </p>
          )
        })
      }
      return null
    }

    return () => {
      return (
        <Tooltip
          overlayClassName={`ns-help__wrap`}
          title={<div style={unref(getTooltipStyle)}>{renderTitle()}</div>}
          autoAdjustOverflow={true}
          overlayStyle={unref(getOverlayStyle)}
          placement={props.placement as 'right'}
          getPopupContainer={() => getPopupContainer()}
        >
          <span class="ns-help">
            {getSlot(slots) || <InfoCircleOutlined />}
          </span>
        </Tooltip>
      )
    }
  }
})
</script>
<style lang="less">
.ns-help {
  display: inline-block;
  vertical-align: text-bottom;
  margin-left: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #909399;
  &:hover {
    color: @primary-color;
  }
  &__wrap {
    p {
      margin-bottom: 0;
    }
  }
}
</style>
