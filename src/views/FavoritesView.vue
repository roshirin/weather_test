<script setup lang="ts">
import WeatherBlock from '@/components/WeatherBlock.vue'
import { useFavorites } from '@/composables/useFavorites'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { getFavoriteCities } = useFavorites()
</script>

<template>
  <div v-if="!getFavoriteCities.length" class="favorites-message">
    {{ t('favoritesEmptyMsg') }}
  </div>

  <div class="weather-blocks-container">
    <template
      v-for="city in getFavoriteCities"
      :key="city.name"
    >
      <weather-block :block-id="city.name" :favorite-city-data="city"/>
    </template>
  </div>
</template>

<style scoped lang="scss">
.favorites-message {
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
</style>
