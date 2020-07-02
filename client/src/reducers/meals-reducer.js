import { mealsTypes as types } from '../actions/types'

export default function uiReducer(state = [], { type, payload }) {
  switch (type) {
    case types.GET_MEALS:
      return payload
    case types.REMOVE_MEAL:
      return state.filter(e => e._id !== payload._id)
    default:
      return state
  }
}