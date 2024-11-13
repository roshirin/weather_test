<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div>
    {{ t('message.goodbye') }}
  </div>
</template>

<style>
</style>
