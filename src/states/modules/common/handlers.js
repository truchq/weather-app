
import {
  setNetworkAction,
} from './actions'


export default (dispatch, state) => ({
  setNetworkAction: async (data) => {
    dispatch(setNetworkAction(data))
  }
})
