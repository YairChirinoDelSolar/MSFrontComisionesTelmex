import Axios from 'axios'
import queryString from 'query-string'

import { store } from './store'
import { hasItem, removeItem } from './storage'

import {
  BASE_URL,
  HTTP_TIMEOUT,
  TOAST_CONSTANTS,
  USER_CONSTANTS
} from '../_constants'

export default class ClientHttp {
  constructor(config) {
    const { query, ...rest } = config
    const url = `${config.url}${
      query ? `?${queryString.stringify(query)}` : ''
    }`

    this.config = { ...rest, url }

    this.instanceAxios = Axios.create({
      baseURL: BASE_URL,
      timeout: HTTP_TIMEOUT,
      url,
      responseType: config.responseType ? config.responseType : 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  request() {
    return new Promise((resolve, reject) => {
      this.instanceAxios
        .request(this.config)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          const {
            response: { status = 0 }
          } = error

          if (status === 401 && hasItem(USER_CONSTANTS.USER_STORAGE_KEY)) {
            store.dispatch({
              type: TOAST_CONSTANTS.ACTION_PUSH_TOAST,
              data: {
                message:
                  'La sesión ha caducado, favor de ingresar nuevamente sus datos.',
                type: 'error'
              }
            })
            store.dispatch({ type: USER_CONSTANTS.ACTION_LOGOUT_REQUEST })
            removeItem(USER_CONSTANTS.USER_STORAGE_KEY)
          }

          reject(error)
        })
    })
  }
}
