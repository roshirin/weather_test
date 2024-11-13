<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import '../styles/modal-window.scss'
import { useWeatherAppStore } from '@/stores/weather-app'

const { t } = useI18n()
const weatherAppStore = useWeatherAppStore()
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-overlay__window modal-window">
      <div class="modal-window__header">
        {{ `${t('favoritesExceedModalMsg')}` }}
      </div>

      <div class="modal-window__buttons">
        <button
          class="options-button"
          @click="weatherAppStore.setIsMaxFavoritesDialogShown(false)"
        >
          {{ t('button.confirm') }}
        </button>
      </div>
    </div>
  </div>
</template>
