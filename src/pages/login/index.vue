<!--
 * @description: 
 * @Author: liwg
 * @Date: 2022-09-30 09:41:21
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-13 11:50:25
-->
<template>
  <div class="login-page">
    <ns-icon icon="icon-zhanghao" />
    <ns-form
      ref="loginFormRef"
      v-model="formModel"
      class="login-form"
      :form-list="formList"
    >
      <template #btn>
        <a-button type="primary" @click="login">登录</a-button>
      </template>
    </ns-form>
    <!-- <ns-table :/> -->
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import type { NsFormInstance, NsFormItem } from '@/packages/src/form/types'
import type { LoginForm } from './types'
const formModel = $ref<LoginForm>()
const loginFormRef = $ref<NsFormInstance>()
const formList = ref<NsFormItem[]>([
  {
    prop: 'username',
    label: '用户名',
    component: 'Input',
    defaultValue: 'admin'
  },
  {
    prop: 'password',
    label: '密码',
    component: 'Input',
    defaultValue: 'a123456'
  }
])
const userStore = useUserStore()
const login = () => {
  loginFormRef.validate().then(async () => {
    await userStore.login(formModel)
    await userStore.getUserMenu()
  })
}
</script>
<style lang="less">
.login-page {
  .login-form {
    width: 500px;
    height: auto;
  }
}
</style>
