<template>
  <div>
    <NsForm v-model="formModel" :form-list="formList">
      <template #test>
        <span>看看</span>
      </template>
    </NsForm>
    <span>{{ formModel }}</span>
  </div>
</template>
<script lang="ts" setup>
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
    label: '单选',
    options: [1, 2],
    defaultValue: 1
  }
])
watchEffect(() => {
  const val = formModel.value
  console.log(val)
})
</script>
<style lang="less"></style>
