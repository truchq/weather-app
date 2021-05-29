// @flow
import { takeLatest, put, select, call} from 'redux-saga/effects'
import {
  searchAction,
  updateKeyWordAction,
  updateForecastAction,
  setLoadingAction
} from './actions'
import { convertCityToLatLong, getForecast } from '../../../services/open'


function getKeyword(keyword, keywords) {
  try {
    return keywords.find((item) => item.keyword === keyword)
  } catch (error) {
  }
}



function* onProcessSearchAction(action) {
  try {
    yield put({ type: setLoadingAction.toString(), payload: true })
    const keywords = yield select(state => state.weather.keywords)
    let keyword = getKeyword(action.payload, keywords);
    if (!keyword) {
      const getLatLongCity = yield call(convertCityToLatLong, action.payload)
      if (getLatLongCity) {
        const {components: { city, country }, geometry} = getLatLongCity
        keyword = {
          keyword: action.payload,
          city,
          country,
          ...geometry
        }
        yield put({ type: updateKeyWordAction.toString(), payload: keyword })
      }
    }
    let forecast = {}
    if(keyword){
      forecast = { keyword }
      const resultGetForecast = yield call(getForecast, keyword)
      if(resultGetForecast){
        forecast = {
          ...forecast,
          ...resultGetForecast
        }
      }
    }
    yield put({ type: updateForecastAction.toString(), payload: forecast })
    yield put({ type: setLoadingAction.toString(), payload: false })

  } catch (error) {
    console.log('ERROR', error);
  }

}


function* watchSearchAction() {
  yield takeLatest(searchAction.toString(), onProcessSearchAction)
}

export default [
  watchSearchAction(),
]
