import { mealsTypes, API } from './types'

export const successGetMeals = (payload) => ({
  type: mealsTypes.GET_MEALS,
  payload,
})

export const successRemoveMeal = (payload) => ({
  type: mealsTypes.REMOVE_MEAL,
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

export const removeMeal = (_id) => ({
  type: API,
  payload: {
    url: '/meals/remove',
    method: 'POST',
    data: {
      _id
    },
    success: () => successRemoveMeal({ _id }),
    error: () => { },
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