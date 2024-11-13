<script setup lang="ts">
import { computed } from 'vue'

const { size = 32, borderWidth = 4 } = defineProps<{
  size?: number,
  borderWidth?: number,
}>()

const spinnerStyle = computed(() => ({
  width: `${size}px`,
  height: `${size}px`,
  borderWidth: `${borderWidth}px`,
}))
</script>

<template>
  <div
    :style="spinnerStyle"
    class="spinner"
  />
</template>

<style scoped lang="scss">
  .spinner {
    border-radius: 50%;
    border: solid $color-light-grey;
    border-color: $color-font-dark $color-font-dark transparent;
    animation: spinner 1.2s infinite linear;
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
