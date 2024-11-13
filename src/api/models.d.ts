import type { WeatherCodeEnum } from "@/enums/HelpersEnum"

export interface OpenweatherParamsModel {
  lat: string
  lon: string
  appid: string
  units: string
}

export interface LocationiqParamsModel {
  q: string
  key: string
  format: string
  limit: number
  tag: string
 'accept-language': string
}

interface CityCoordinatesModel {
  lat: number
  lon: number
}

export interface DayWeatherModel {
  clouds: {
    all: number
  }
  dt: number
  main: {
    feels_like: number
    grnd_level: number
    humidity: number
    pressure: number
    sea_level: number
    temp: number
    temp_max: number
    temp_min: number
  }
  visibility: number
  weather: {
    description: string
    icon: WeatherCodeEnum
    id: number
    main: string
  }[]
  wind: {
    deg: number
    gust: number
    speed: number
  }
}

export interface CurrentWeatherDataModel extends DayWeatherModel {
  base: string
  cod: number
  coord: CityCoordinatesModel
  id: number
  name: string
  timezone: number
  sys: {
    country: string
    id: number
    sunrise: number
    sunset: number
    type: number
  }
}

export interface ForecastWeatherItemModel extends DayWeatherModel{
  dt_txt: string
  pop: number
  sys: {
    pod: string
  }
}

export interface ForecastWeatherDataModel {
  city: {
    coord: CityCoordinatesModel
    country: string
    id: number
    name: string
    population: number
    sunrise: number
    sunset: number
    timezone: number
  }
  cnt: number
  cod: string
  list: ForecastWeatherItemModel[]
  message: number
}

export interface CityAutocompleteModel {
  address: {
    country: string
    country_code: string
    county: string
    name: string
    state: string
  }
  boundingbox: number[]
  class: string
  display_address: string
  display_name: string
  display_place: string
  lat: string
  licence: string
  lon: string
  osm_id: string
  osm_type: string
  place_id: string
  type: string
}
