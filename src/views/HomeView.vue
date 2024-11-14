<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import MaxFavoritesDialog from '@/components/MaxFavoritesDialog.vue'
import RemoveWeatherBlockDialog from '@/components/RemoveWeatherBlockDialog.vue'
import WeatherBlock from '@/components/WeatherBlock.vue'
import { useWeatherAppStore } from '@/stores/weather-app'

const weatherAppStore = useWeatherAppStore()

onMounted(() => {
  weatherAppStore.addWeatherBlock()
})

onUnmounted(() => {
  weatherAppStore.clearWeatherBlocks()
})
</script>

<template>
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
    @click="weatherAppStore.addWeatherBlock"
  >
    +
  </button>

  <remove-weather-block-dialog
    v-if="weatherAppStore.isRemoveWeatherBlockDialogShown"
  />

  <max-favorites-dialog
    v-if="weatherAppStore.isMaxFavoritesDialogShown"
  />
</template>

<style scoped lang="scss">
  .weather-blocks-container {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @include onTablet {
      gap: 30px;
    }
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
