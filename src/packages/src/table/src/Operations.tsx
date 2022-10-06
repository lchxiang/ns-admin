import { DownOutlined } from '@ant-design/icons-vue'
import { operationProps } from './props'
import type { NsButtonProps, NsTableBtnParams, OperationConfig } from './types'
import type { ExtractPropTypes } from 'vue'
import type { VxeTableDefines } from 'vxe-table'
type OperationAllProps = ExtractPropTypes<typeof operationProps> &
  VxeTableDefines.CellRenderBodyParams

export default defineComponent({
  name: 'GridBtns',
  inheritAttrs: false,
  props: operationProps,
  emits: ['click'],
  setup(props, { attrs }) {
    const allProps = $computed(() => {
      return { ...props, ...attrs } as unknown as OperationAllProps
    })
    const { operationConfig, row } = allProps
    const { dropdownMaxNum, dropdownDefaultShowNum } =
      operationConfig as OperationConfig
    const isDropdown = $computed(() => {
      return allProps.operationList.length > (dropdownMaxNum as number)
    })
    const outerOperations = $computed(() => {
      return !isDropdown
        ? allProps.operationList
        : allProps.operationList.slice(0, dropdownDefaultShowNum)
    })
    const dropdownOperations = $computed(() => {
      return !isDropdown
        ? []
        : allProps.operationList.slice(dropdownDefaultShowNum)
    })
    const renderBtnItem = ({
      onClick,
      type,
      code,
      text,
      icon,
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
          {text || icon}
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
                  {text}
                </a-menu-item>
              )
            })}
          </a-menu>
        )
      }
      return (
        <>
          <a-divider type="vertical" />
          <a-dropdown v-slots={overlay}>
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
        <div>
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
