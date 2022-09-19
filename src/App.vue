<template>
  <a-button type="primary" @click="test">试试</a-button>
  <span class="theme">我是主题色</span>
  <span>{{ userStore.token }}</span>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'

import { useUserStore } from '@/store/user'
// import {$computed} 'vue/macros'
const color = ref({
  primaryColor: 'red'
})
const userStore = useUserStore()
const test = () => {
  userStore.token = '666'
  ConfigProvider.config({
    theme: color.value
  })
}
</script>
<style lang="less">
.theme {
  color: var(--ant-primary-color);
}
</style>
