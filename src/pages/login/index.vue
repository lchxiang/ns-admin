<template>
  <div>
    <a-button @click="changeText">gaibian</a-button>
    <NsForm v-model="formModel" :form-list="formList">
      <template #test>
        <span>看看</span>
      </template>
    </NsForm>
    <ns-table
      url="/user/queryPage"
      :columns="clomunList"
      :btn-list="btnList"
      :form-list="formList"
      :operation-config="operationConfig"
      :operation-list="operationList"
    />
  </div>
</template>
<script lang="ts" setup>
import type {
  NsButtonProps,
  NsColumnProps,
  OperationConfig
} from '@/packages/src/table/src/types'
import type { NsFormItem } from '@/packages/src/form/types'
const formModel = ref({})
const formList = ref<NsFormItem[]>([
  {
    prop: 'Input',
    label: '名称',
    component: 'Input',
    defaultValue: 'liwenguang',
    placeholder: '我试试'
  },
  {
    component: 'Select',
    prop: 'Select',
    label: '下拉选',
    options: ['男', '女'],
    defaultValue: '男',
    allowClear: true
  },
  {
    component: 'Checkbox',
    prop: 'Checkbox',
    label: '多选',
    options: [1, 2],
    defaultValue: [2]
  },
  {
    component: 'Radio',
    slot: 'test',
    isNormal: true,
    label: '单选',
    options: [1, 2],
    defaultValue: 1
  }
])
watchEffect(() => {
  const val = formModel.value
  console.log(val)
})
const clomunList: NsColumnProps[] = [
  {
    field: 'username',
    title: '用户名'
  },
  {
    field: 'name',
    title: '姓名'
  }
]
const operationList = reactive<NsButtonProps[]>([
  {
    text: '试试1',
    onClick({ row, code }) {
      console.log(row)
    },
    show: false
  },
  {
    text: '试试2',
    onClick({ row, code }) {
      console.log(row)
    }
  },
  {
    text: '试试3',
    onClick({ row, code }) {
      console.log(row)
    }
  },
  {
    text: '试试4',
    onClick({ row, code }) {
      console.log(row)
    }
  },
  {
    text: '试试5',
    onClick({ row, code }) {
      console.log(row)
    }
  },
  {
    text: '试试6',
    onClick({ row, code }) {
      console.log(row)
    }
  }
])
const operationConfig = reactive<OperationConfig>({ moreText: '更多' })
const btnList: NsButtonProps[] = [
  {
    text: '测试按钮',
    type: 'primary',
    show: () => {
      return true
    },
    onClick() {
      console.log('测试呀')
    }
  },
  {
    text: '测试按钮',
    type: 'primary',
    children: [
      {
        text: '按钮1',
        show: true,
        onClick() {
          console.log('测试呀')
        }
      },
      {
        text: '按钮2',
        show: true,
        onClick() {
          console.log('测试呀')
        }
      }
    ],
    show: () => {
      return true
    },
    onClick() {
      console.log('测试呀')
    }
  }
]

const changeText = () => {
  operationConfig.moreText = '文广'
}
</script>
<style lang="less"></style>
