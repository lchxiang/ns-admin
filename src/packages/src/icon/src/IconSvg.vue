<template>
  <svg aria-hidden="true" class="svg-icon sds" v-bind="$attrs">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
  import { vueTypes } from '@/utils/vueTypes'

  defineOptions({
    name: 'IconSvg'
  })
  const props = defineProps({
    prefix: vueTypes.string.def('icon'),
    icon: vueTypes.string.isRequired,
    color: vueTypes.string
  })

  const symbolId = computed(() => `#${props.prefix}-${props.icon}`)
</script>

<style lang="less" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    overflow: hidden;
    fill: currentColor;
  }
</style>
