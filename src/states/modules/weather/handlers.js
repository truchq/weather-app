
import {
  searchAction,
  removeKeyWordAction
} from './actions'


export default (dispatch, state) => ({
  searchAction: async (data) => {
    dispatch(searchAction(data))
  },
  removeKeyWordAction: async (data) => {
    dispatch(removeKeyWordAction(data))
  },
})
