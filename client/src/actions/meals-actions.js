import { mealsTypes, API } from './types'

export const successGetMeals = (payload) => ({
  type: mealsTypes.GET_MEALS,
  payload,
})

export const addMeal = (data) => ({
  type: API,
  payload: {
    url: '/meals/create',
    method: 'POST',
    data,
    success: () => { },
    error: () => { },
    noDispatchSuccess: true,
  },
})

export const getMeals = (logId) => ({
  type: API,
  payload: {
    url: '/meals/get-all',
    method: 'POST',
    data: {
      logId
    },
    success: (response) => successGetMeals(response.data),
    error: () => { },
  },
})