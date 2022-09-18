<template>
  <a-button type="primary" @click="test">试试</a-button>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'
const color = ref({
  primaryColor: 'red'
})
const test = () => {
  ConfigProvider.config({
    theme: color.value
  })
}
</script>
<style lang=""></style>
