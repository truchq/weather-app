import { all } from 'redux-saga/effects'
import { moduleSagas } from '../modules'

export default (getState) => {
  function * rootSaga () {
    yield all([
      ...moduleSagas
    ])
  }
  return rootSaga
}
