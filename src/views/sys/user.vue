<!--
 * @description: 
 * @Author: liwg
 * @Date: 2022-10-11 09:51:26
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-11 09:51:28
-->
<template>
  <ns-table
    :url="'/user/queryPage'"
    :columns="columns"
    :btn-list="btnList"
    :form-list="formList"
    :operation-list="operationList"
  />
</template>
<script lang="ts" setup>
import type { NsFormItem } from '@/packages/src/form/types'
import type {
  NsBtnProps,
  NsColumnProps,
  NsOperationProps
} from '@/packages/src/table/src/types'

const formList: NsFormItem[] = [
  {
    component: 'Input',
    label: '用户名',
    prop: 'username'
  },
  {
    component: 'Input',
    label: '姓名',
    prop: 'name'
  }
]

const btnList: NsBtnProps[] = [
  {
    text: '新建用户',
    onClick({ code }) {
      console.log(code)
    }
  }
]

const operationList: NsOperationProps[] = [
  {
    text: '编辑'
  },
  {
    text: '启用',
    show({ row }) {
      return row.state === 0
    }
  },
  {
    text: '禁用',
    show({ row }) {
      return row.state === 1
    }
  },
  {
    text: '删除'
  }
]
const columns: NsColumnProps[] = [
  {
    field: 'username',
    title: '用户名'
  },
  {
    field: 'name',
    title: '姓名'
  },
  {
    field: 'state',
    title: '状态',
    formatter({ cellValue }) {
      return cellValue ? '启用' : '禁用'
    }
  }
]
</script>
<style lang="less" scoped></style>
