<!--
 * @description: 
 * @Author: liwg
 * @Date: 2022-10-14 14:01:26
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-17 16:10:36
-->
<template>
  <NsQrcode :options="options" />
</template>
<script lang="ts" setup>
import type { NsQrcodeOptions } from '@/packages/src/qrcode/types'

const options = ref<NsQrcodeOptions>({
  width: 210,
  height: 210,
  data: 'cessssss'
})
</script>
<style lang="less" scoped></style>
