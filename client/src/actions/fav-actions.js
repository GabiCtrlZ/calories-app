import { favTypes, API } from './types'

export const successAddFav = (payload) => ({
  type: favTypes.ADD_FAV,
  payload,
})

export const successRemoveFav = (payload) => ({
  type: favTypes.REMOVE_FAV,
  payload,
})

export const addFav = (data) => ({
  type: API,
  payload: {
    url: '/favorites/create',
    method: 'POST',
    data,
    success: response => successAddFav(response.data),
    error: () => { },
  },
})

export const removeFav = (data) => ({
  type: API,
  payload: {
    url: '/favorites/delete',
    method: 'POST',
    data,
    success: response => successRemoveFav(response.data),
    error: () => { },
  },
})
