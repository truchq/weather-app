import axios from 'axios'
import { openCage, openWeather } from '../configs'
const convertCityToLatLong = async (city) => {
  try {
    const data = await axios.get(`${openCage.domain}/geocode/v1/json?pretty=1&no_annotations=1&no_dedupe=1&no_record=1&limit=1&q=${city}&key=${openCage.key}`)
    if (data.data?.results?.length) {
      return data.data.results[0]
    }
    return null
  } catch (error) {
    return null
  }
}
const getForecast = async ({ lat, lng, exclude = 'hourly,minutely,current' }) => {
  try {
    const data = await axios.get(`${openWeather.domain}/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=${exclude}&appid=${openWeather.appId}`)
    if (data?.data) {
      return data?.data
    }
    return null
  } catch (error) {
    return null
  }
}


export {
  convertCityToLatLong,
  getForecast
}