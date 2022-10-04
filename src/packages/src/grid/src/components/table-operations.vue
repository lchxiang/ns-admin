<template>
  <div class="operations-wraps">
    <!-- 操作列个数小于等于最大个数时 全部显示 -->
    <template v-if="!isDropdown && rowOperation.length">
      <template v-for="(operationItem, operationIndex) in rowOperation" :key="operationIndex">
        <el-button
          :class="getBtnClass(operationItem)"
          :type="operationItem.type || 'primary'"
          link
          size="small"
          @click="
            operationItem.click({ code: operationItem.code, row, rowIndex, columnIndex, column })
          "
          >{{ operationItem.text }}</el-button
        >
      </template>
    </template>
    <!-- 操作列个数大于最大个数时 会显示前两个按钮 其他为下拉显示 -->
    <template v-else-if="rowOperation.length">
      <!-- 前两个按钮 -->
      <span>{{ realOperationsConfig.dropdownDefaultShowNum }}</span>
      <template
        v-for="(n, numIndex) in realOperationsConfig.dropdownDefaultShowNum"
        :key="numIndex"
      >
        <el-button
          v-if="rowOperation[n - 1]"
          class="operation-text"
          :class="rowOperation[n - 1].class"
          :type="rowOperation[n - 1].type || 'primary'"
          link
          size="small"
          @click="
            rowOperation[n - 1].click({
              code: rowOperation[n - 1].code,
              row,
              rowIndex,
              columnIndex,
              column,
            })
          "
          >{{ rowOperation[n - 1].text }}</el-button
        >
      </template>
      <!-- 超出最大按钮个数 下拉部分 显示 图标+按钮 -->
      <el-dropdown class="operation-dropdown" :show-timeout="80" :hide-on-click="false">
        <span class="el-dropdown-link">
          {{ realOperationsConfig.operationMore }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="operation-dropdown_prop">
            <template v-for="(operationItem, operationIndex) in rowOperation">
              <el-dropdown-item
                v-if="operationIndex >= realOperationsConfig.dropdownDefaultShowNum"
                :key="operationIndex"
                :class="`${operationItem.class} no-choose-row`"
                @click="
                  operationItem.click({
                    code: operationItem.code,
                    row,
                    rowIndex,
                    columnIndex,
                    column,
                  })
                "
              >
                {{ operationItem.text }}</el-dropdown-item
              >
            </template>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </div>
</template>

<script setup>
  import { isFunction, cloneDeep } from 'lodash'

  defineOptions({
    name: 'TableOperations',
  })
  const { permit: permitRef, permitOperations, realOperationsConfig } = inject('$nsGrid', {})

  const props = defineProps({
    row: {
      type: Object,
      default: () => ({}),
    },
    rowIndex: {
      type: Number,
      default: 0,
    },
    column: {
      type: Object,
      default: () => ({}),
    },
  })

  //计算行数据
  const permit = unref(permitRef)
  const rowOperation = computed(() => {
    const row = toRaw(props.row)
    const list = cloneDeep(unref(permitOperations)).filter((operationItem) => {
      const item = unref(operationItem)
      //菜单权限
      if (item.code) {
        if (permit && isFunction(permit)) {
          item.text = permit(item.code)
          if (item.alias) {
            item.text = isFunction(item.alias) ? item.alias(row, item) : item.alias
          }
        }
      }

      //行内数据权限
      const judgesObj = item.show
      if (judgesObj && typeof judgesObj === 'string') {
        return eval(judgesObj) /*eslint-disable-line*/
      } else if (Object.prototype.toString.call(judgesObj) === '[object Function]') {
        return judgesObj(row)
      } else {
        return true
      }
    })
    return list
  })

  //是否下拉
  const isDropdown = computed(() => {
    return (
      unref(realOperationsConfig).autoDropdown &&
      unref(rowOperation).length > unref(realOperationsConfig).dropdownMaxNum
    )
  })

  function getBtnClass(item) {
    return [
      `operation-text no-choose-row ${item.class}`,
      ['删除', '移除'].includes(item.text) ? 'danger' : '',
    ]
  }
</script>
