import { generalTypes, API } from './types'

export const setLoadingTrue = () => ({
  type: generalTypes.LOADING_TRUE,
})

export const setLoadingFalse = () => ({
  type: generalTypes.LOADING_FALSE,
})

export const successChangeLight = () => ({
  type: generalTypes.CHANGE_LIGHT,
})

export const changeLight = (isLight) => ({
  type: API,
  payload: {
    url: '/users/update-light',
    method: 'POST',
    data: { isLight },
    success: () => successChangeLight(),
    error: () => successChangeLight(),
  },
})