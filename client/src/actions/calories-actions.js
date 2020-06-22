import { caloriesTypes, API } from './types'

export const successSetCalories = (payload) => ({
  type: caloriesTypes.SET_CALORIES,
  payload,
})

export const setCalories = (data) => ({
  type: API,
  payload: {
    url: '/calories/update',
    method: 'POST',
    data,
    success: response => successSetCalories(response.data),
    error: () => { },
  },
})
