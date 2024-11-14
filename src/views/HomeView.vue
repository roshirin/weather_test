<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import MaxFavoritesDialog from '@/components/MaxFavoritesDialog.vue'
import RemoveWeatherBlockDialog from '@/components/RemoveWeatherBlockDialog.vue'
import WeatherBlock from '@/components/WeatherBlock.vue'
import { useWeatherAppStore } from '@/stores/weather-app'
import { useHelpers } from '@/composables/useHelpers'
import { useI18n } from 'vue-i18n'

const weatherAppStore = useWeatherAppStore()
const { getCoordinatesByIp } = useHelpers()
const { t } = useI18n()

const initialLoading = ref<boolean>(false)

onMounted(async () => {
  initialLoading.value = true
  try {
    // if user coordinates were not attempted to load, make attempt
    if (!weatherAppStore.isUserCoodinatesChecked) {
      const userCoordinates = await getCoordinatesByIp()

      if (userCoordinates) {
        weatherAppStore.setUserCoordinates(userCoordinates)
        weatherAppStore.addWeatherBlock(true)

        return
      }

      weatherAppStore.setIsUserCoodinatesChecked(true)
    }

    weatherAppStore.addWeatherBlock()
  }
  finally {
    initialLoading.value = false
  }
})

onUnmounted(() => {
  weatherAppStore.clearWeatherBlocks()
})
</script>

<template>
  <div v-if="initialLoading" class="initial-loading-screen">
    {{ t('message.initialLoadingPermission') }}
  </div>

  <template v-else>
    <div class="weather-blocks-container">
      <template
        v-for="id in weatherAppStore.weatherBlocks"
        :key="id"
      >
        <weather-block :block-id="id"/>
      </template>
    </div>

    <button
      v-if="weatherAppStore.weatherBlocks.length < 5"
      class="home-page__add-button add-block-button"
      @click="weatherAppStore.addWeatherBlock()"
    >
      +
    </button>
  </template>

  <remove-weather-block-dialog
    v-if="weatherAppStore.isRemoveWeatherBlockDialogShown"
  />

  <max-favorites-dialog
    v-if="weatherAppStore.isMaxFavoritesDialogShown"
  />
</template>

<style scoped lang="scss">
  .initial-loading-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    padding: 24px;
    height: 60px;
    max-width: 600px;
    border-radius: 20px;
    text-align: center;
    background-color: $color-white;
  }

  .add-block-button {
    width: 100%;
    height: 60px;
    margin-top: 20px;

    border: none;
    background-color: $color-white;
    opacity: 0.8;

    font-family: SourceSans, sans-serif;
    font-size: 42px;
    font-weight: 600;
    color: $color-dark-grey;

    cursor: pointer;
    transition: all 0.2s;

    @include onDesktop {
      border-radius: 30px;
    }

    &:hover {
      opacity: 1;
    }
  }
</style>
