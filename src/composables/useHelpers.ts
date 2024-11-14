import type { CurrentWeatherDataModel, ForecastWeatherDataModel } from "@/api/models"
import type { DayChartDataModel, PreparedForecastDataModel, PreparedTodaysDataModel } from "@/components/models"
import { monthNames, weatherCodeBackgrounds, weatherCodeIcons } from "@/enums/HelpersEnum"
import { useI18n } from "vue-i18n"

export function useHelpers() {
  const { t } = useI18n()

  function getAverageFromArray(values: number[]) {
    return Math.round(values.reduce((acc, value) => acc + value, 0) / values.length)
  }

  function getTimeLabel(timestamp: number, timezoneOffset: number) {
    const localTimestamp = timestamp + timezoneOffset
    let hours = String(new Date(localTimestamp * 1000).getUTCHours())

    if (hours.length === 1) {
      hours = '0' + hours
    }

    return `${hours}:00`
  }

  function prepareTodaysWeatherData(data: CurrentWeatherDataModel) {
    const {
      dt,
      main: { temp },
      weather: {
        0: { icon },
      },
    } = data

    const date = new Date(dt * 1000).getDate()
    const temperature = Math.round(temp)
    const iconSrc = weatherCodeIcons[icon]
    const backgroundSrc = weatherCodeBackgrounds[icon]

    return { date, temperature, iconSrc, backgroundSrc } as PreparedTodaysDataModel
  }

  function prepareForecastWeatherData(data: ForecastWeatherDataModel) {
    const localTimezone = data.city.timezone
    const todaysDate = new Date(data.list[0].dt + localTimezone).getUTCDate()

    let id = 0
    let nightTemps = [] as number[]
    let dayTemps = [] as number[]
    let cloudsIds = [] as number[]

    // forecast list contains data for every 3 hours, we need to calculate average data for next 4 days
    return data.list.reduce((acc, dayData) => {
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
  }

  function prepareChartData(chartData: (DayChartDataModel | PreparedForecastDataModel)[], isFiveDaysChart: boolean) {
    if (isFiveDaysChart) {
      const daysChartData = chartData as PreparedForecastDataModel[]
      const xAxisLabels = daysChartData.map(entry => `${entry.date} ${t(`months.${entry.month}`)}`)
      const graphDayTemp = daysChartData.map(entry => entry.dayTemp)
      const graphNightTemp = daysChartData.map(entry => entry.nightTemp)

      return { xAxisLabels, graphDayTemp, graphNightTemp }
    }

    const dayChartData = chartData as DayChartDataModel[]
    const xAxisLabels = dayChartData.map(entry => entry.time)
    const graphTemperature = dayChartData.map(entry => entry.temperature)

    return { xAxisLabels, graphTemperature }
  };

  async function getCoordinatesByIp(): Promise<[number, number] | null> {
    try {
      const position: GeolocationPosition = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      const latitude = position.coords.latitude
      const longitude = position.coords.longitude

      return [latitude, longitude]
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        console.error("Geolocation error:", error.message)
      }

      return null
    }
  };

  return {
    getTimeLabel,
    prepareTodaysWeatherData,
    prepareForecastWeatherData,
    prepareChartData,
    getCoordinatesByIp,
  }
}
