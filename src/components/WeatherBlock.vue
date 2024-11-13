<script setup lang="ts">
import { computed, ref } from 'vue'
import SearchPanel from './SearchPanel.vue'
import '../styles/weather-block.scss'
import { apiGetWeatherForecast, apiGetWeatherForToday } from '@/api/api'
import { openweatherConfig } from '@/enums/ApiEnum'
import { useNotify } from '@/composables/useNotify'
import { useI18n } from 'vue-i18n'
import type { CityAutocompleteModel, CurrentWeatherDataModel, ForecastWeatherDataModel } from '@/api/models'
import { monthNames, weatherCodeBackgrounds, weatherCodeIcons } from '@/enums/HelpersEnum'
import LoadingSpinner from './LoadingSpinner.vue'
import type { DayChartDataModel, PreparedForecastDataModel, PreparedTodaysDataModel } from './models'
import WeatherCard from './WeatherCard.vue'
import WeatherChart from './WeatherChart.vue'
import { useWeatherAppStore } from '@/stores/weather-app'

const { blockId } = defineProps<{
  blockId: string
}>()

const { t } = useI18n()
const { notifyError } = useNotify()
const weatherAppStore = useWeatherAppStore()

const isLoading = ref<boolean>(false)
const isFiveDaysChart = ref<boolean>(false)
const currentWeatherData = ref<CurrentWeatherDataModel | null>(null)
const forecastWeatherData = ref<ForecastWeatherDataModel | null>(null)
const cityName = ref<string | null>(null)
const cityCoordinates = ref<[string, string] | null>(null)

const todaysWeather = computed(() => {
  if (!currentWeatherData.value) {
    return null
  }

  const {
    dt,
    main: { temp },
    weather: {
      0: { icon },
    },
  } = currentWeatherData.value

  const date = new Date(dt * 1000).getDate()
  const temperature = Math.round(temp)
  const iconSrc = weatherCodeIcons[icon]
  const backgroundSrc = weatherCodeBackgrounds[icon]

  return { date, temperature, iconSrc, backgroundSrc } as PreparedTodaysDataModel
})

const fourDaysForecastWeather = computed(() => {
  if (!forecastWeatherData.value?.list.length) {
    return null
  }

  const localTimezone = forecastWeatherData.value.city.timezone
  const todaysDate = new Date(forecastWeatherData.value.list[0].dt + localTimezone).getUTCDate()

  let id = 0
  let nightTemps = [] as number[]
  let dayTemps = [] as number[]
  let cloudsIds = [] as number[]

  const getAverageFromArray = (values: number[]) => {
    return Math.round(values.reduce((acc, value) => acc + value) / values.length)
  }

  // forecast list contains data for every 3 hours, we need to calculate average data for next 4 days
  return forecastWeatherData.value.list.reduce((acc, dayData) => {
    const localTimestamp = dayData.dt + localTimezone
    const dateObj = new Date(localTimestamp * 1000)
    const date = dateObj.getUTCDate()
    const month = dateObj.getUTCMonth()
    const hours = dateObj.getUTCHours()
    const temperature = dayData.main.temp
    const clouds = dayData.clouds.all

    // we do not need forecast for today and further date if we already have 4 days in accumulator
    if (date === todaysDate || acc.length >= 4) {
      return acc
    }

    // split for night and day temperatures
    if (hours < 9) {
      nightTemps.push(temperature)
    } else {
      dayTemps.push(temperature)
    }

    cloudsIds.push(clouds)

    if (dayTemps.length >= 5) {
      acc.push({
        id,
        date: date,
        month: monthNames[month],
        nightTemp: getAverageFromArray(nightTemps),
        dayTemp: getAverageFromArray(dayTemps),
        clouds: getAverageFromArray(cloudsIds),
      })

      nightTemps = []
      dayTemps = []
      cloudsIds = []
      id++
    }

    return acc
  }, [] as PreparedForecastDataModel[])
})

const cardData = computed(() => {
  if (!todaysWeather.value || !fourDaysForecastWeather.value) {
    return null
  }

  return [todaysWeather.value, fourDaysForecastWeather.value] as [PreparedTodaysDataModel, PreparedForecastDataModel[]]
})

const chartData = computed(() => {
  if (!forecastWeatherData.value?.list.length) {
    return null
  }

  if (isFiveDaysChart.value && fourDaysForecastWeather.value) {
    return fourDaysForecastWeather.value
  }

  const timezoneOffset = forecastWeatherData.value.city.timezone

  const getTime = (timestamp: number) => {
    const localTimestamp = timestamp + timezoneOffset
    let hours = String(new Date(localTimestamp * 1000).getUTCHours())

    if (hours.length === 1) {
      hours = '0' + hours
    }

    return `${hours}:00`
  }

  return forecastWeatherData.value.list.map((forecastEntry) => {
    const {
      dt,
      main: { temp },
    } = forecastEntry
    const time = getTime(dt).slice(0, 5)

    return { time, temperature: Math.round(temp) }
  }) as DayChartDataModel[]
})

async function handleCitySelected(data: CityAutocompleteModel) {
  try {
    isLoading.value = true
    const { lat, lon } = data
    const params = {
      ...openweatherConfig,
      lat,
      lon,
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
</script>

<template>
  <div
    class="weather-block"
  >
    <div class="weather-block__header">
      <div class="search-block weather-block__city">
        <search-panel @city-selected="handleCitySelected"/>
      </div>

      <div class="weather-block__buttons">
        <!-- <FavoritesButton
          v-if="cardData"
          :selectedCity="selectedCity"
          :coordinates="coordinates"
          @extraFavoriteAdded="handleExtraFavorite"
        /> -->

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
        class="weather-block__preloader"
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
