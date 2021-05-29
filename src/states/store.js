import { persistStore, persistCombineReducers } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose } from 'redux'
import createSaga from '../states/middlewares'
import { moduleReducers } from '../states/modules'

import AsyncStorage from '@react-native-community/async-storage'

const config = {
  key: 'root',
  storage: AsyncStorage,
}

const createReducers = reducers => {
  return persistCombineReducers(config, {
    ...moduleReducers
  })
}

const createMiddlewares = sagaMiddleware => {
  const middlewares = []
  if (__DEV__) {
    const createDebugger = require('redux-flipper').default;
    middlewares.push(createDebugger());
  }
  // Saga Middleware
  if (sagaMiddleware) {
    middlewares.push(sagaMiddleware)
  }
  return applyMiddleware.apply({}, middlewares)
}

const composeEnhancers =
  process.env.NODE_ENV !== 'production'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose
const buildStore = (reducers, initialState) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    createReducers(reducers),
    initialState,
    composeEnhancers(createMiddlewares(sagaMiddleware))
  )

  const persistor = persistStore(store)
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(createReducers(reducers))
    })
  }

  store.reducers = createReducers(reducers)
  sagaMiddleware.run(createSaga(store.getState))
  return { persistor, store }
}

export default buildStore()
