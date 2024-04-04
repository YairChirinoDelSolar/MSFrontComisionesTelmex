import SSEClient from '../_helpers/sse-client'
import ClientHttp from '../_helpers/http'
import { HTTP_METHOD_POST } from '../_constants'

export const getClient = () => {
  return new SSEClient({
    url: `${process.env.BACKEND_SERVER_COMISIONES}/api/v1/sse/listen`
  })
}

export const getAll = ({ page, size, status, sort }) => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/getNotifications',
      method: HTTP_METHOD_POST,
      query: { page, size, status, sort }
    })
      .request()
      .then(response => {
        const { data = {} } = response
        resolve(data)
      })
      .catch(error => {
        const {
          response: { data = {} }
        } = error

        reject(data)
      })
  })
}

export const markAsRead = notification => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/markAsReadNotification',
      method: HTTP_METHOD_POST,
      data: { notification }
    })
      .request()
      .then(response => {
        const { data = {} } = response
        resolve(data)
      })
      .catch(error => {
        const {
          response: { data = {} }
        } = error

        reject(data)
      })
  })
}

export const markAllAsRead = () => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/markAsReadAllNotifications',
      method: HTTP_METHOD_POST
    })
      .request()
      .then(response => {
        const { data = {} } = response
        resolve(data)
      })
      .catch(error => {
        const {
          response: { data = {} }
        } = error

        reject(data)
      })
  })
}
