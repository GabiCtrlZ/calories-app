import { uiTypes, API } from './types'

export const setUserData = (payload) => ({
  type: uiTypes.SUCCESS_LOGIN,
  payload,
})

export const failedLogin = () => ({
  type: uiTypes.FAILED_LOGIN,
  payload: false
})

export const failedLogin2 = () => ({
  type: uiTypes.FAILED_LOGIN2,
  payload: false
})

export const resetLoginError = () => ({
  type: uiTypes.RESET_LOGIN,
})

export const login = ({ email, password }) => ({
  type: API,
  payload: {
    url: '/users/login',
    method: 'POST',
    data: {
      email,
      password,
    },
    success: payload => setUserData(payload),
    error: () => failedLogin(),
    dispatchError: true,
    withLoading: true,
  },
})

export const register = ({ email, password }) => ({
  type: API,
  payload: {
    url: '/users/register',
    method: 'POST',
    data: {
      email,
      password,
    },
    success: payload => setUserData(payload),
    withLoading: true,
    costumMessage: 'Oops! seems like this email is taken!',
    costumMessage2: 'Password must be at least 1 upper case letter, 1 lower case, 1 number and 8 charcters',
  },
})

export const getUserData = () => ({
  type: API,
  payload: {
    url: '/users/user-data',
    method: 'POST',
    success: payload => setUserData(payload),
    error: () => failedLogin2(),
    dispatchError: true,
    withLoading: true,
  },
})