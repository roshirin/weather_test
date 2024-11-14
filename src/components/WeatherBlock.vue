<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { apiGetWeatherForecast, apiGetWeatherForToday } from '@/api/api'
import type { CityAutocompleteModel, CurrentWeatherDataModel, ForecastWeatherDataModel } from '@/api/models'
import type { DayChartDataModel, FavoriteCityModel, PreparedForecastDataModel, PreparedTodaysDataModel } from './models'
import { openweatherConfig } from '@/enums/ApiEnum'
import LoadingSpinner from './LoadingSpinner.vue'
import SearchPanel from './SearchPanel.vue'
import WeatherCard from './WeatherCard.vue'
import WeatherChart from './WeatherChart.vue'
import { useWeatherAppStore } from '@/stores/weather-app'
import { useNotify } from '@/composables/useNotify'
import { useHelpers } from '@/composables/useHelpers'
import { useFavorites } from '@/composables/useFavorites'
import { initialBlockId, maxFavoritesLength, pointsOnDayChart } from '@/enums/HelpersEnum'
import '../styles/weather-block.scss'

const { blockId, favoriteCityData } = defineProps<{
  blockId: string
  favoriteCityData?: FavoriteCityModel
}>()

const { t, locale } = useI18n()
const { notifyError } = useNotify()
const weatherAppStore = useWeatherAppStore()
const {
  getTimeLabel,
  prepareTodaysWeatherData,
  prepareForecastWeatherData,
} = useHelpers()
const {
  getFavoriteCities,
  addToFavorites,
  removeFromFavorites,
  checkIfInFavorites,
} = useFavorites()

const isLoading = ref<boolean>(false)
const isFiveDaysChart = ref<boolean>(false)
const currentWeatherData = ref<CurrentWeatherDataModel | null>(null)
const forecastWeatherData = ref<ForecastWeatherDataModel | null>(null)
const cityName = ref<string | null>(null)
const cityCoordinates = ref<[string, string] | null>(null)

// data for the city card
const cardData = computed(() => {
  if (!currentWeatherData.value || !forecastWeatherData.value?.list.length) {
    return null
  }

  const todaysWeather = prepareTodaysWeatherData(currentWeatherData.value)
  const forecastWeather = prepareForecastWeatherData(forecastWeatherData.value)

  return [todaysWeather, forecastWeather] as [PreparedTodaysDataModel, PreparedForecastDataModel[]]
})

// data for weather chart
const chartData = computed(() => {
  if (!forecastWeatherData.value?.list.length) {
    return null
  }

  // chart is built on cardData forecastWeather in 5 days mode
  if (isFiveDaysChart.value && cardData.value?.[1]) {
    return cardData.value[1]
  }

  // gather data for 1 day chart
  const timezoneOffset = forecastWeatherData.value.city.timezone

  return forecastWeatherData.value.list.map((forecastEntry) => {
    const {
      dt,
      main: { temp },
    } = forecastEntry
    const time = getTimeLabel(dt, timezoneOffset)

    return { time, temperature: Math.round(temp) }
  }).slice(0, pointsOnDayChart) as DayChartDataModel[]
})

const isInFavorites = computed(() => {
  if (!cityName.value)
    return false

  return checkIfInFavorites(cityName.value)
})

const backgroundImageSrc = computed(() => {
  return cardData.value?.[0].backgroundSrc || 'few-clouds.jpg'
})

function loadFavoriteCityData() {
  if (!favoriteCityData) {
    return
  }

  const {
    name,
    coordinates,
  } = favoriteCityData

  const data = {
    display_place: name,
    lat: coordinates[0],
    lon: coordinates[1],
  }

  handleCitySelected(data)
}

// load city weather data
async function handleCitySelected(data: Partial<CityAutocompleteModel>) {
  try {
    isLoading.value = true
    const { lat, lon } = data

    if (!lat || !lon) {
      return
    }

    const params = {
      ...openweatherConfig,
      lat,
      lon,
      lang: locale.value,
    }
    const [currentData, forecastData] = await Promise.all([
      apiGetWeatherForToday(params),
      apiGetWeatherForecast(params),
    ])

    currentWeatherData.value = currentData.data
    forecastWeatherData.value = forecastData.data
    cityName.value = data.display_place || currentData.data.name
    cityCoordinates.value = [lat, lon]
  }
  catch {
    notifyError(t('notify.weatherError'))
  }
  finally {
    isLoading.value = false
  }
}

function handleCloseWeatherBlock() {
  weatherAppStore.setBlockToCloseId(blockId)
  weatherAppStore.setIsRemoveWeatherBlockDialogShown(true)
}

function handleFavoriteToggle() {
  if (!cityName.value || !cityCoordinates.value) {
    return
  }
  // if city is already in favorites, remove it
  if (isInFavorites.value) {
    removeFromFavorites(cityName.value)
    return
  }
  // if favorites are full, show dialog with warning
  if (getFavoriteCities.value.length >= maxFavoritesLength) {
    weatherAppStore.setIsMaxFavoritesDialogShown(true)
    return
  }

  const newCity = {
    name: cityName.value,
    coordinates: cityCoordinates.value,
  }

  addToFavorites(newCity)
}

onMounted(() => {
  if (blockId === initialBlockId && weatherAppStore.userCoordinates) {
    const data = {
      lat: String(weatherAppStore.userCoordinates[0]),
      lon: String(weatherAppStore.userCoordinates[1]),
    }

    handleCitySelected(data)

    return
  }

  if (favoriteCityData) {
    loadFavoriteCityData()
  }
})
</script>

<template>
  <div
    class="weather-block"
    :style="{ backgroundImage: `url(img/backgrounds/${backgroundImageSrc})` }"
  >
    <div class="weather-block__header">
      <div v-if="!favoriteCityData" class="search-block weather-block__city">
        <search-panel @city-selected="handleCitySelected"/>
      </div>

      <div class="weather-block__buttons">
        <button
          class="favorites-button"
          @click="handleFavoriteToggle"
        >
          <img v-if="isInFavorites" src="/img/icons/icon-star-full.svg" class="favorites-icon" />
          <img v-else src="/img/icons/icon-star-empty.svg" class="favorites-icon" />
        </button>

        <div class="switcher-container">
          <label class="mode-switcher">
            <input
              v-model="isFiveDaysChart"
              type="checkbox"
              class="mode-switcher__input"
            />
            <span
              :data-content="isFiveDaysChart ? '5d' : '1d'"
              class="mode-switcher__slider"
            />
          </label>
        </div>

        <button
          v-if="weatherAppStore.weatherBlocks.length > 1 && !favoriteCityData"
          class="remove-block-button"
          @click="handleCloseWeatherBlock"
        />
      </div>
    </div>

    <div
      v-if="cardData || isLoading"
      class="weather-block__content weather-info"
    >
      <loading-spinner
        v-if="isLoading"
        class="weather-info__spinner"
      />

      <template v-else>
        <weather-card
          v-if="cardData"
          :city-name="cityName"
          :card-data="cardData"
          :is-five-days-chart="isFiveDaysChart"
          class="weather-info__item"
        />

        <weather-chart
          v-if="chartData"
          :chartData="chartData"
          :isFiveDaysChart="isFiveDaysChart"
          class="weather-info__item"
        />
      </template>
    </div>
  </div>
</template>
