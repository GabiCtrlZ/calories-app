import axios from 'axios'
import { API } from '../actions/types'
import { REACT_APP_BASE_URL } from '../consts'
import React from 'react'
import { Button } from '@material-ui/core'
import { closeSnackbar, playSnackbar } from '../lib/snackbar'
import { setLoadingFalse, setLoadingTrue } from '../actions/general-actions'

axios.defaults.withCredentials = true

axios.interceptors.response.use(response => response, (error) => {
  if (error.response && (error.response.status === 401 || error.response.status === 400)) {
    if (window.location.pathname === '/login' || window.location.pathname === '/register') {
      if (window.location.pathname === '/register' && error.response.status === 400) {
        return Promise.reject('register')
      }
      return Promise.reject('login')
    } else {
      return Promise.reject(401)
    }
  }
})

const errorSnackbarActions = key => (
  <Button onClick={() => { closeSnackbar(key) }}>
    {'Dismiss'}
  </Button>
)

export const playErrorSnackbar = (costumMessage) => {
  playSnackbar(costumMessage || 'Something went wrong.', {
    variant: 'error',
    autoHideDuration: 7000,
    action: errorSnackbarActions,
  })
}

export const playSuccessSnackbar = (successSnackbar) => {
  playSnackbar(successSnackbar, {
    variant: 'success',
    autoHideDuration: 3000,
    action: errorSnackbarActions,
  })
}

const middleware = ({ dispatch }) => next => action => {
  if (action.type !== API) return next(action)

  const { url, success, error, method = 'GET', data, noDispatchSuccess, flowData, dispatchError, flowMe, withLoading, successSnackbar, costumMessage, costumMessage2 } = action.payload

  const baseUrl = REACT_APP_BASE_URL

  if (withLoading) {
    dispatch(setLoadingTrue())
  }

  axios({
    method,
    url: `${baseUrl || ''}/api/v1${url}`,
    data,
  }).then(response => response && response.data)
    .then(resData => {
      if (flowMe && resData) {
        success(resData, flowMe)
      }
      else if (noDispatchSuccess && resData) {
        success(resData)
      }
      else if (flowData && resData) {
        dispatch(success(data))
      }
      else if (resData) {
        dispatch(success(resData))
      }
      else if (error && dispatchError) {
        dispatch(error())
      }
      else if (error) {
        error()
      }
      if (withLoading) {
        dispatch(setLoadingFalse())
      }
      if (resData && successSnackbar) {
        playSuccessSnackbar(successSnackbar)
      }
    })
    .catch(err => {
      if (err === 'login') {
        if (error) {
          dispatch(error())
        }
        else {
          playErrorSnackbar(costumMessage)
        }
      }
      else if (err === 'register') {
        playErrorSnackbar(costumMessage2)
      }
      else {
        playErrorSnackbar(costumMessage)
      }
      if (withLoading) {
        dispatch(setLoadingFalse())
      }
    })
}

export default middleware