export enum ApiKey {
  OPENWEATHER = '687e88bf9fce5309e0cb7ce909791969',
  LOCATIONIQ = 'pk.18b7672e8deb1aaea5f8d47aecc2f516',
}

export enum ApiEndpoint {
  OPENWEATHER_BASE = 'https://api.openweathermap.org/data/2.5',
  WEATHER = '/weather',
  FORECAST = '/forecast',
  LOCATIONIQ_BASE = 'https://eu1.locationiq.com/v1/autocomplete',
}

export const autocompleteConfig = {
  key: ApiKey.LOCATIONIQ,
  format: 'json',
  limit: 5,
  tag: 'place:city,place:town',
}

export const openweatherConfig = {
  appid: ApiKey.OPENWEATHER,
  units: 'metric',
}
