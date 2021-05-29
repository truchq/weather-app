import { handleActions } from 'redux-actions'

import * as actions from './actions'

const defaultState = {
  data: {},
  keywords: [],
  loading: false
}


const handlers = {
  [actions.updateForecastAction]: (state, action) => {
    return {
      ...state,
      data: action.payload
    }
  },
  [actions.updateKeyWordAction]: (state, action) => {
    return {
      ...state,
      keywords: [
        action.payload,
        ...state.keywords
      ]
    }
  },
  [actions.removeKeyWordAction]: (state, action) => {
    const keywords = state.keywords.filter(item => item.keyword !== action.payload)
    return {
      ...state,
      keywords
    }
  },
  [actions.setLoadingAction]: (state, action) => {
    return {
      ...state,
      loading: action.payload
    }
  },
}

export default handleActions(handlers, defaultState)
