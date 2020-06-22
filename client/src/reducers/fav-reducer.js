import { favTypes as types, uiTypes } from '../actions/types'

export default function uiReducer(state = [], { type, payload }) {
  switch (type) {
    case uiTypes.SUCCESS_LOGIN:
      return payload.data.favorites
    case types.ADD_FAV:
      return [
        ...state,
        payload,
      ]
    case types.REMOVE_FAV:
      return state.filter(e => e._id !== payload._id)
    default:
      return state
  }
}