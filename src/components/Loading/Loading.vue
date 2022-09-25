<!--
 * @Author: liwg
 * @Date: 2022-03-19 10:43:55
 * @LastEditors: liwg
 * @LastEditTime: 2022-03-19 11:01:06
-->
<template>
  <section
    v-show="loading"
    class="full-loading"
    :class="{ absolute, [theme]: !!theme }"
    :style="[background ? `background-color: ${background}` : '']">
    <a-spin v-bind="$attrs" :tip="tip" :size="size" :spinning="loading" />
  </section>
</template>
<script lang="ts" setup>
  import { PropType } from 'vue'

  import { SizeEnum } from '@/enums/sizeEnum'
  defineProps({
    tip: {
      type: String as PropType<string>,
      default: ''
    },
    size: {
      type: String as PropType<SizeEnum>,
      default: SizeEnum.DEFAULT
    },
    absolute: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    loading: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    background: {
      type: String as PropType<string>
    },
    theme: {
      type: String as PropType<'dark' | 'light'>,
      default: ''
    }
  })
</script>
<style lang="less" scoped>
  .full-loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgb(240 242 245 / 60%);

    &.absolute {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 300;
    }
  }
</style>
