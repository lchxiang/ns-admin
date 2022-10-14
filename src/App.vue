<!--
 * @description: 
 * @Author: liwg
 * @Date: 2022-09-30 09:41:21
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-13 13:53:36
-->
<template>
  <ConfigProvider>
    <router-view />
  </ConfigProvider>
</template>
<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'
// ConfigProvider.config({
//   theme: 'light'
// })
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
