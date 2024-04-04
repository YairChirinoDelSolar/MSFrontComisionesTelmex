import ClientHttp from '../_helpers/http'
import { HTTP_METHOD_POST } from '../_constants'
import { emptyUser } from '../_data'

export const getProfile = () => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/getProfile',
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

export const getACL = () => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/getACL',
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

export const create = request => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/createUser',
      method: HTTP_METHOD_POST,
      data: { ...request }
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

export const getEmpty = idEmpleado => ({
  ...emptyUser,
  empleado: { idEmpleado }
})
