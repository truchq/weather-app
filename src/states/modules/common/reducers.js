// @flow
import { handleActions } from 'redux-actions'
import * as actions from './actions'

const defaultState = {
  networkConnected: true,
}


const handlers = {
  [actions.setNetworkAction]: (state, action) => {
    return {
      ...state,
      networkConnected: action.payload
    }
  }
}

export default handleActions(handlers, defaultState)
