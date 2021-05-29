import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const searchAction = createAction(`${MODULE_NAME}_search`);
export const updateForecastAction = createAction(`${MODULE_NAME}_updateForecastAction`);
export const updateKeyWordAction = createAction(`${MODULE_NAME}_updateKeyWordAction`);
export const setLoadingAction = createAction(`${MODULE_NAME}_setLoadingAction`);
export const removeKeyWordAction = createAction(`${MODULE_NAME}_removeKeyWordAction`);





