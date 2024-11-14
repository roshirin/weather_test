<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
</script>

<template>
  <select
    v-model="locale"
    class="language-select"
  >
    <option value="en">en</option>
    <option value="uk">укр</option>
  </select>
</template>

<style scoped lang="scss">
  .language-select {
    height: 24px;
    min-width: 60px;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 18px;
    color: $color-font-dark;
    cursor: pointer;
  }
</style>
