<script setup lang="ts" name="Ceshi">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <a-button type="primary">试试</a-button>
</template>

<style scoped>
.read-the-docs {
  z-index: 6;
  width: 60px;
  height: 60px;
  color: #888;
  background-color: #fff;
}
</style>
