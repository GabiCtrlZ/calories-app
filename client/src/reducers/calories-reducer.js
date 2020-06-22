import { caloriesTypes as types, uiTypes } from '../actions/types'

export default function uiReducer(state = {}, { type, payload }) {
  switch (type) {
    case types.SET_CALORIES:
      return {
        ...state,
        ...payload,
      }
    case uiTypes.SUCCESS_LOGIN:
      return payload.data.calories
    default:
      return state
  }
}