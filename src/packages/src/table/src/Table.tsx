/* eslint-disable require-await */
import { VxeGrid } from 'vxe-table'
import merge from 'lodash-es/merge'
import cloneDeep from 'lodash-es/cloneDeep'
import isUndefined from 'lodash-es/isUndefined'
import { filterTree } from 'xe-utils'
import pick from 'lodash-es/pick'
import http from '@/utils/http'
import { isArray, isBoolean, isFunction, isObject, isString } from '@/utils/is'
import { getValueByPath } from '../../helper'
import NsForm from '../../form/index'
import { initDefaultProps } from '../../_utils/props'
import { globalConfig } from '../../global-config'
import { useNsProviderContext } from '../../hooks/useNsContext'
import { nsTableProps } from './props'
import Operations from './Operations'
import Btns from './Btns'
import { createTableProviderContext } from './hooks/useTableContext'
import type { NsFormInstance } from '../../form/index'
import type {
  NsColumnProps,
  NsTableExpose,
  NsTableMethods,
  NsTableProps
} from './types'
import type { VxeGridInstance, VxeGridProps } from 'vxe-table'
export default defineComponent({
  name: 'NsTable',
  props: initDefaultProps(
    nsTableProps,
    pick(globalConfig, ['gridConfig', 'operationConfig'])
  ),
  emits: ['register'],
  setup: (props, { slots, emit, expose }) => {
    const vxeGridRef = ref<VxeGridInstance>()
    const searchFormRef = ref<NsFormInstance>()
    let innerProps = $ref<NsTableProps>({})
    const searchFormModel = $ref({})
    const {
      gridConfig: globalGridConfig,
      operationConfig: globalOperationConfig
    } = $(useNsProviderContext())
    //============================================props============================================
    async function setProps(gridProps: NsTableProps) {
      innerProps = merge(innerProps || {}, gridProps)
    }
    const realProps = $computed(() => {
      return { ...props, ...innerProps }
    })
    //============================================GridConfig============================================
    //默认配置
    const defaultGridConfig: VxeGridProps = {
      proxyConfig: {
        ajax: {
          query: tableAjax
        }
      },
      toolbarConfig: {
        slots: {
          buttons: 'toolbar_buttons'
        }
      }
    }
    //全局匹配置、组件自定义配置、默认配置合并=>最终表格配置
    const realGridConfig = $computed(() => {
      const config = merge(
        {},
        defaultGridConfig,
        realProps.gridConfig || {},
        globalGridConfig || {}
      )
      return config
    })

    //数据请求
    function tableAjax({ page: { currentPage, pageSize } }) {
      const isPage = realGridConfig?.pagerConfig?.enabled
      return new Promise((resolve, reject) => {
        const { queryParams, url, isFormData, loadSuccess, resultFiled } =
          realProps
        const copyFormParams = JSON.parse(JSON.stringify(searchFormModel || {}))
        const params = isFunction(queryParams)
          ? queryParams(copyFormParams)
          : isObject(queryParams)
          ? Object.assign(queryParams, copyFormParams)
          : {}
        http
          .post(
            {
              url,
              data: { currentPage, pageSize, ...copyFormParams, ...params }
            },
            { formData: isFormData, isTransformResponse: false }
          )
          .then((res) => {
            if (isFunction(loadSuccess)) {
              loadSuccess(res)
            }
            if (isPage) {
              resolve(res)
            } else {
              const data = getValueByPath(res, resultFiled)
              resolve(data || {})
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    }

    //============================================操作配置============================================

    const realOperationsConfig = $computed(() => {
      const k = merge(
        globalConfig.operationConfig,
        realProps.operationConfig || {},
        globalOperationConfig || {}
      )
      return k
    })

    //首次过滤操作列 此处只过滤操作权限  都没权限时 不显示操作列
    const permitOperations = $computed(() => {
      const { operationList = [], permit } = realProps
      const copyoperations = cloneDeep(operationList)
      if (operationList && operationList.length > 0) {
        return copyoperations.filter((item) => {
          return (
            (isFunction(permit) && (permit(item.code) || !item.isPermit)) ||
            !permit
          )
        })
      }
      return []
    })

    ///////////////////////////////////////列配置////////////////////////////////////
    let columnSlotsName = $ref<string[]>([])

    //columns 处理
    const realColumns = $computed(() => {
      const copyColumns = cloneDeep(unref(realProps).columns || [])
      const rawColumnsSlotsName: string[] = []
      const columns: NsColumnProps[] = filterTree(copyColumns, (item) => {
        const { show, slots } = item
        const isShow = isUndefined(show)
          ? true
          : isFunction(show)
          ? show(item)
          : isBoolean(show)
          ? show
          : true
        if (slots && isObject(slots) && isShow) {
          Object.values(slots).forEach((value) => {
            if (isString(value)) {
              rawColumnsSlotsName.push(value)
            }
          })
        }
        return isShow
      })
      columnSlotsName = rawColumnsSlotsName
      if (
        permitOperations &&
        isArray(permitOperations) &&
        permitOperations.length > 0
      ) {
        columns.push({
          title: '操作',
          minWidth: 80,
          fixed: 'right',
          field: 'operation',
          ...realOperationsConfig,
          slots: {
            default: 'operation'
          }
        })
      }
      if (columns.length > 2) {
        columns[0].fixed = 'left'
        columns[1].fixed = 'left'
      }
      return columns
    })
    /////////////////////////////////////event//////////////////////////////////
    const refreshTable = function (type = 'query') {
      vxeGridRef.value?.commitProxy(type)
    }

    const resetTable = function () {
      searchFormRef.value?.resetFormValue()
      refreshTable()
    }

    const methods: NsTableMethods = {
      setProps,
      refreshTable,
      resetTable
    }

    onMounted(() => {
      emit('register', methods)
    })

    const permit = computed(() => realProps.permit)
    createTableProviderContext({
      permit
    })

    expose({
      vxeGridRef,
      searchFormRef,
      setProps,
      refreshTable,
      resetTable
    } as NsTableExpose)

    return () => {
      const { formConfig, formList, btnList } = props

      const renderForm = () => {
        if (formList.length === 0) return null
        return (
          <div>
            <NsForm
              ref={searchFormRef}
              {...formConfig}
              formList={formList}
              type={'search'}
              v-model={[searchFormModel, 'modelValue']}
              v-slots={{
                btn: () => (
                  <div class={'ns-form-searchWrap'}>
                    <a-button onClick={refreshTable}>查询</a-button>
                    <a-button onClick={resetTable}>重置</a-button>
                  </div>
                )
              }}
            ></NsForm>
          </div>
        )
      }

      const renderTable = () => {
        const gridSlots = {
          operation: (scope) => (
            <Operations
              {...scope}
              operationList={permitOperations}
              operationConfig={realOperationsConfig}
            ></Operations>
          ),
          toolbar_buttons: () => <Btns btnList={btnList}></Btns>
        }
        columnSlotsName.forEach((name) => {
          if (slots[name]) {
            gridSlots[name] = (scope) => slots[name]?.(scope)
          }
        })
        return (
          <div class="vxe-grid_wraps">
            <VxeGrid
              ref={vxeGridRef}
              class="ns-base-table"
              {...realGridConfig}
              columns={realColumns}
              v-slots={gridSlots}
            ></VxeGrid>
          </div>
        )
      }
      return (
        <div>
          {slots.searchForm ? slots.searchForm?.() : renderForm()}
          {renderTable()}
        </div>
      )
    }
  }
})
