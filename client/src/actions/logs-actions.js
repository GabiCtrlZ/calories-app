import { logsTypes, API } from './types'

export const successAddLog = (payload) => ({
  type: logsTypes.ADD_LOG,
  payload,
})

export const removeLog = () => ({
  type: logsTypes.REMOVE_LOG,
})

export const addLog = () => ({
  type: API,
  payload: {
    url: '/logs/create',
    method: 'POST',
    data: {},
    success: (response) => successAddLog(response.data),
    error: () => {},
  },
})