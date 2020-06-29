import Immutable from 'seamless-immutable'
import { mealsTypes as types, uiTypes } from '../actions/types'

const initialState = Immutable([{
  _id: '0',
  protein: '40',
  fat: '12',
  carbs: '66',
},
{
  _id: '1',
  protein: '40',
  fat: '12',
  carbs: '66',
},
{
  _id: '2',
  protein: '40',
  fat: '12',
  carbs: '66',
},
{
  _id: '3',
  protein: '40',
  fat: '12',
  carbs: '66',
}])

export default function uiReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_MEALS:
      return payload
    // case uiTypes.SUCCESS_LOGIN:
    //   return payload.data.logs
    default:
      return state
  }
}