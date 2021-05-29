
import { default as weatherReducer } from "./weather/reducers";
import { default as commonReducer } from "./common/reducers";

import { MODULE_NAME as WEATHER_MODULE_NAME } from "./weather/models";
import { MODULE_NAME as COMMON_MODULE_NAME } from "./common/models";

import weatherSagas from "./weather/sagas";

export const moduleReducers = {
  [WEATHER_MODULE_NAME]: weatherReducer,
  [COMMON_MODULE_NAME]: commonReducer
}

export const moduleSagas = [
  ...weatherSagas
]
