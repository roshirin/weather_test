<script setup lang="ts">
import Chart, { type ChartTypeRegistry } from 'chart.js/auto'
import type { DayChartDataModel, PreparedForecastDataModel } from './models'
import { onMounted, ref, computed, watch, shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHelpers } from '@/composables/useHelpers'

const { chartData, isFiveDaysChart } = defineProps<{
  chartData: (DayChartDataModel | PreparedForecastDataModel)[]
  isFiveDaysChart: boolean
}>()

const { t } = useI18n()
const { prepareChartData } = useHelpers()

const weatherChart = ref<HTMLCanvasElement | null>(null)
const chart = shallowRef<Chart<keyof ChartTypeRegistry, number[] | undefined, string> | null>(null)

const chartConfig = computed(() => {
  const {
    xAxisLabels,
    graphTemperature,
    graphDayTemp,
    graphNightTemp,
  } = prepareChartData(chartData, isFiveDaysChart)

  const data = {
    labels: xAxisLabels,
    datasets: [
      {
        label: t('temperature'),
        data: graphTemperature,
        borderColor: 'rgb(255, 255, 255)',
      },
      {
        label: t('dayTemperature'),
        data: graphDayTemp,
        borderColor: 'rgb(255, 255, 255)',
      },
      {
        label: t('nightTemperature'),
        data: graphNightTemp,
        borderColor: 'rgb(0, 0, 255)',
      },
    ],
  }

  return {
    type: 'line' as keyof ChartTypeRegistry,
    data: data,
    options: {
      tension: 0.3,
      elements: {
        point: {
          borderWidth: 3,
          radius: 2,
          hitRadius: 8,
          hoverRadius: 5,
          style: 'circle',
        },
      },
      scales: {
        x: {
          border: {
            display: false,
          },
          ticks: {
            display: true,
            color: '#ffffff',
            'padding': 20,
          },
          grid: {
            display: false,
          },
        },
        y: {
          border: {
            display: false,
          },
          ticks: {
            color: '#ffffff',
            'padding': 20,
            callback: (label: string | number, index: number) => {
              if (index % 2 === 0) {
                return label + '°C'
              }

              return ''
            }
          },
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    }
  }
})

function createWeatherChart() {
  if (!weatherChart.value) {
    return
  }

  const context = weatherChart.value.getContext('2d')

  if (context) {
    chart.value = new Chart(context, chartConfig.value)
  }
}

function updateWeatherChart() {
  if (chart.value) {
    chart.value.options = chartConfig.value.options
    chart.value.data = chartConfig.value.data
    chart.value.update()
  }
}

onMounted(() => {
  createWeatherChart()
})

watch(() => isFiveDaysChart, () => {
  updateWeatherChart()
})
</script>

<template>
  <div class="weather-chart">
    <div class="weather-chart__header">
      {{ t('chartHeader') }}
    </div>

    <canvas ref="weatherChart"></canvas>
  </div>
</template>

<style lang="scss">
  .weather-chart {
    padding-top: 10px;
    border-top: 1px solid #8dc1ca;

    @include onDesktop {
      flex-basis: 56%;
      padding-left: 20px;
      border-top: none;
      border-left: 1px solid #8dc1ca;
    }

    &__header {
      margin-bottom: 20px;
      text-align: center;
      font-size: 30px;
      color: $color-white;
    }
  }
</style>
