<template>
  <a-layout>
    <LayoutSider />
    <a-layout>
      <a-layout-header> 头部 </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import LayoutSider from './sider/LayoutSider'
</script>
<style lang="less">
@import './style/index.less';
</style>
