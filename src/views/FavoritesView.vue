<script setup lang="ts">
import WeatherBlock from '@/components/WeatherBlock.vue'
import { useFavorites } from '@/composables/useFavorites'

const { getFavoriteCities } = useFavorites()
</script>

<template>
  <div class="weather-blocks-container">
    <template
      v-for="city in getFavoriteCities"
      :key="city.name"
    >
      <weather-block :block-id="city.name" :favorite-city-data="city"/>
    </template>
  </div>
</template>

<style>
</style>
