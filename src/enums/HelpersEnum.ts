export const monthNames = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
]

export enum WeatherCodeEnum {
  CLEAR_DAY = '01d',
  CLEAR_NIGHT = '01n',
  FEW_CLOUDS_DAY = '02d',
  FEW_CLOUDS_NIGHT = '02n',
  SCATTERED_CLOUDS_DAY = '03d',
  SCATTERED_CLOUDS_NIGHT = '03n',
  OVERCAST_CLOUDS_DAY = '04d',
  OVERCAST_CLOUDS_NIGHT = '04n',
  HEAVY_RAIN_DAY = '09d',
  HEAVY_RAIN_NIGHT = '09n',
  LIGHT_RAIN_DAY = '10d',
  LIGHT_RAIN_NIGHT = '10n',
  THUNDERSTORM_DAY = '11d',
  THUNDERSTORM_NIGHT = '11n',
  SNOW_DAY = '13d',
  SNOW_NIGHT = '13n',
  FOG_DAY = '50d',
  FOG_NIGHT = '50n',
}

export const weatherCodeIcons: Record<WeatherCodeEnum, string> = {
  [WeatherCodeEnum.CLEAR_DAY]: 'clear-sky.svg',
  [WeatherCodeEnum.CLEAR_NIGHT]: 'clear-sky-night.svg',
  [WeatherCodeEnum.FEW_CLOUDS_DAY]: 'few-clouds.svg',
  [WeatherCodeEnum.FEW_CLOUDS_NIGHT]: 'few-clouds-night.svg',
  [WeatherCodeEnum.SCATTERED_CLOUDS_DAY]: 'scattered-clouds.svg',
  [WeatherCodeEnum.SCATTERED_CLOUDS_NIGHT]: 'scattered-clouds.svg',
  [WeatherCodeEnum.OVERCAST_CLOUDS_DAY]: 'overcast-clouds.svg',
  [WeatherCodeEnum.OVERCAST_CLOUDS_NIGHT]: 'overcast-clouds.svg',
  [WeatherCodeEnum.HEAVY_RAIN_DAY]: 'heavy-rain.svg',
  [WeatherCodeEnum.HEAVY_RAIN_NIGHT]: 'heavy-rain.svg',
  [WeatherCodeEnum.LIGHT_RAIN_DAY]: 'light-rain.svg',
  [WeatherCodeEnum.LIGHT_RAIN_NIGHT]: 'light-rain-night.svg',
  [WeatherCodeEnum.THUNDERSTORM_DAY]: 'thunderstorm-with-rain.svg',
  [WeatherCodeEnum.THUNDERSTORM_NIGHT]: 'thunderstorm-with-rain-night.svg',
  [WeatherCodeEnum.SNOW_DAY]: 'snow.svg',
  [WeatherCodeEnum.SNOW_NIGHT]: 'snow.svg',
  [WeatherCodeEnum.FOG_DAY]: 'fog.svg',
  [WeatherCodeEnum.FOG_NIGHT]: 'fog.svg',
}

export const weatherCodeBackgrounds: Record<WeatherCodeEnum, string> = {
  [WeatherCodeEnum.CLEAR_DAY]: 'clear-sky.jpg',
  [WeatherCodeEnum.CLEAR_NIGHT]: 'clear-sky-night.jpg',
  [WeatherCodeEnum.FEW_CLOUDS_DAY]: 'few-clouds.jpg',
  [WeatherCodeEnum.FEW_CLOUDS_NIGHT]: 'few-clouds-night.jpg',
  [WeatherCodeEnum.SCATTERED_CLOUDS_DAY]: 'scattered-clouds.jpg',
  [WeatherCodeEnum.SCATTERED_CLOUDS_NIGHT]: 'scattered-clouds.jpg',
  [WeatherCodeEnum.OVERCAST_CLOUDS_DAY]: 'overcast-clouds.jpg',
  [WeatherCodeEnum.OVERCAST_CLOUDS_NIGHT]: 'overcast-clouds.jpg',
  [WeatherCodeEnum.HEAVY_RAIN_DAY]: 'heavy-rain.jpg',
  [WeatherCodeEnum.HEAVY_RAIN_NIGHT]: 'heavy-rain.jpg',
  [WeatherCodeEnum.LIGHT_RAIN_DAY]: 'light-rain.jpg',
  [WeatherCodeEnum.LIGHT_RAIN_NIGHT]: 'light-rain-night.jpg',
  [WeatherCodeEnum.THUNDERSTORM_DAY]: 'thunderstorm-with-rain.jpg',
  [WeatherCodeEnum.THUNDERSTORM_NIGHT]: 'thunderstorm-with-rain.jpg',
  [WeatherCodeEnum.SNOW_DAY]: 'snow.jpg',
  [WeatherCodeEnum.SNOW_NIGHT]: 'snow.jpg',
  [WeatherCodeEnum.FOG_DAY]: 'scattered-clouds.jpg',
  [WeatherCodeEnum.FOG_NIGHT]: 'scattered-clouds.jpg',
}

export const maxFavoritesLength = 5
export const pointsOnDayChart = 8
