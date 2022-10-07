import { DownOutlined } from '@ant-design/icons-vue'
import { isFunction } from 'xe-utils'
import { isBoolean, isString } from '@/utils/is'
import { operationProps } from './props'
import { useTableProviderContext } from './hooks/useTableContext'
import type { NsButtonProps, NsTableBtnParams, OperationConfig } from './types'
import type { ExtractPropTypes } from 'vue'
import type { VxeTableDefines } from 'vxe-table'
type OperationAllProps = ExtractPropTypes<typeof operationProps> &
  VxeTableDefines.CellRenderBodyParams

export default defineComponent({
  name: 'GridBtns',
  inheritAttrs: false,
  props: operationProps,
  setup(props, { attrs }) {
    const { permit } = $(useTableProviderContext())
    const allProps = $computed(() => {
      return { ...props, ...attrs } as unknown as OperationAllProps
    })
    const { operationConfig, row } = allProps
    const { dropdownMaxNum, dropdownDefaultShowNum } =
      operationConfig as OperationConfig
    //此处是数据权限的过滤
    const realOperationList = $computed(() => {
      return allProps.operationList.filter(({ show, code }) => {
        const params: NsTableBtnParams = { row, code }
        if (isFunction(show)) {
          return show(params)
        } else if (isBoolean(show)) {
          return show
        } else if (isString(show)) {
          return eval(show)
        } else {
          return true
        }
      })
    })

    const getText = ({ text, alias }: NsButtonProps) => {
      return text || alias || permit?.()
    }

    //是否下拉
    const isDropdown = $computed(() => {
      return realOperationList.length > (dropdownMaxNum as number)
    })
    const outerOperations = $computed(() => {
      return !isDropdown
        ? realOperationList
        : realOperationList.slice(0, dropdownDefaultShowNum)
    })
    const dropdownOperations = $computed(() => {
      return !isDropdown ? [] : realOperationList.slice(dropdownDefaultShowNum)
    })
    const renderBtnItem = ({
      onClick,
      type,
      code,
      text,
      ...rest
    }: NsButtonProps) => {
      const params: NsTableBtnParams = { row, code }
      return (
        <a-button
          type={type || 'link'}
          onClick={() => {
            onClick?.(params)
          }}
          {...rest}
        >
          {getText({ code, text })}
        </a-button>
      )
    }
    const renderDropdown = () => {
      if (dropdownOperations.length === 0) return null
      const overlay = {
        overlay: () => (
          <a-menu>
            {dropdownOperations.map(({ onClick, text, code }, index) => {
              const params: NsTableBtnParams = { row, code }
              return (
                <a-menu-item
                  key={index}
                  onClick={() => {
                    onClick?.(params)
                  }}
                >
                  {getText({ code, text })}
                </a-menu-item>
              )
            })}
          </a-menu>
        )
      }
      return (
        <>
          <a-divider type="vertical" />
          <a-dropdown
            overlayClassName={'ns-operation-dropdown'}
            v-slots={overlay}
          >
            <span>
              {allProps?.operationConfig?.moreText}
              <DownOutlined />
            </span>
          </a-dropdown>
        </>
      )
    }
    return () => {
      const lastIndex = outerOperations.length - 1

      return (
        <div class="ns-operation">
          {outerOperations.length > 0 &&
            outerOperations.map((item, index: number) => (
              <>
                {renderBtnItem(item)}
                {index !== lastIndex && <a-divider type="vertical" />}
              </>
            ))}
          {renderDropdown()}
        </div>
      )
    }
  }
})
