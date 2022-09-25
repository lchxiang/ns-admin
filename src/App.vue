<template>
  <ConfigProvider>
    <router-view />
  </ConfigProvider>
</template>
<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'

// import { useUserStore } from '@/store/user'
// import {$computed} 'vue/macros'
</script>
<style lang="less">
.theme {
  z-index: 666;
  width: 30px;
  height: 60px;
  background-color: #fff;
  color: var(--ant-primary-color);
}
</style>
