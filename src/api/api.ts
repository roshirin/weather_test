import { ApiEndpoint } from '@/enums/ApiEnum'
import axios from 'axios'
import type {
  CityAutocompleteModel,
  CurrentWeatherDataModel,
  ForecastWeatherDataModel,
  LocationiqParamsModel,
  OpenweatherParamsModel,
} from './models'

export function apiGetWeatherForToday(params: OpenweatherParamsModel) {
  return axios.get<CurrentWeatherDataModel>(ApiEndpoint.OPENWEATHER_BASE + ApiEndpoint.WEATHER, { params })
}

export function apiGetWeatherForecast(params: OpenweatherParamsModel) {
  return axios.get<ForecastWeatherDataModel>(ApiEndpoint.OPENWEATHER_BASE + ApiEndpoint.FORECAST, { params })
}

export function apiGetCitiesAutocomplete(params: LocationiqParamsModel) {
  return axios.get<CityAutocompleteModel[]>(ApiEndpoint.LOCATIONIQ_BASE, { params })
}
