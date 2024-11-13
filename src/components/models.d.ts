export interface PreparedTodaysDataModel {
  date: number
  temperature: number
  iconSrc: string
  backgroundSrc: string
}

export interface PreparedForecastDataModel {
  id: number
  date: number
  month: string
  nightTemp: number
  dayTemp: number
  clouds: number
}

export interface DayChartDataModel {
  time: string
  temperature: number
}
