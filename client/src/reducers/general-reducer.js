import Immutable from 'seamless-immutable'
import { generalTypes as types, uiTypes } from '../actions/types'

const initialState = Immutable({
  isLoading: false,
  isLight: true,
})

export default function uiReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.LOADING_TRUE:
      return {
        ...state,
        isLoading: true,
      }
    case types.LOADING_FALSE:
      return {
        ...state,
        isLoading: false,
      }
    case types.CHANGE_LIGHT:
      return {
        ...state,
        isLight: !state.isLight,
      }
    case uiTypes.SUCCESS_LOGIN:
      return {
        ...state,
        isLight: payload.data.isLight,
      }
    default:
      return state
  }
}