import Config from 'react-native-config'

const openCage = {
  domain: 'https://api.opencagedata.com',
  key: Config.OPEN_CAGE_KEY
}
const openWeather = {
  domain: 'https://api.openweathermap.org',
  appId: Config.OPEN_WEATHER_APP_ID
}
const IMAGE_DOMAIN = "http://openweathermap.org"

export {
  openCage,
  openWeather,
  IMAGE_DOMAIN
}