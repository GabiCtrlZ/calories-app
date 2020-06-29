import { logsTypes as types, uiTypes } from '../actions/types'

export default function uiReducer(state = [], { type, payload }) {
  switch (type) {
    case types.ADD_LOG:
      return [
        payload,
        ...state,
      ]
    case types.REMOVE_LOG:
      return state.filter(e => e._id !== payload._id)
    case uiTypes.SUCCESS_LOGIN:
      return payload.data.logs
    default:
      return state
  }
}