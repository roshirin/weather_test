<script setup lang="ts">
import { useWeatherAppStore } from '@/stores/weather-app'
import '../styles/modal-window.scss'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const weatherAppStore = useWeatherAppStore()

function handleConfirmRemoval() {
  weatherAppStore.closeWeatherBlock()
  weatherAppStore.setIsRemoveWeatherBlockDialogShown(false)
}

function handleCancelRemoval() {
  weatherAppStore.setBlockToCloseId(null)
  weatherAppStore.setIsRemoveWeatherBlockDialogShown(false)
}
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-overlay__window modal-window">
      <div class="modal-window__header">
        {{ t('blockRemoveModalMsg') }}
      </div>

      <div class="modal-window__buttons">
        <button
          class="options-button"
          @click="handleConfirmRemoval"
        >
          {{ t('button.confirm') }}
        </button>

        <button
          class="options-button"
          @click="handleCancelRemoval"
        >
          {{ t('button.cancel') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '../styles/modal-window.scss';
</style>
