import ClientHttp from '../_helpers/http'
import { HTTP_METHOD_POST } from '../_constants'
import { emptyEmpleado } from '../_data'

export const getAll = ({ page, size, sort }) => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/getEmpleados',
      method: HTTP_METHOD_POST,
      data: {},
      query: { page, size, sort }
    })
      .request()
      .then(response => {
        const { data = {} } = response
        resolve(data)
      })
      .catch(error => {
        const { data = {} } = error
        reject(data)
      })
  })
}

export const getEmpty = () => emptyEmpleado

export const getOne = empleado => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/getEmpleado',
      method: HTTP_METHOD_POST,
      data: { empleado }
    })
      .request()
      .then(response => {
        const { data = {} } = response
        resolve(data)
      })
      .catch(error => {
        const { data = {} } = error
        reject(data)
      })
  })
}

export const create = request => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/createEmpleado',
      method: HTTP_METHOD_POST,
      data: { ...request }
    })
      .request()
      .then(response => {
        const { data = {} } = response
        resolve(data)
      })
      .catch(error => {
        const { data = {} } = error
        reject(data)
      })
  })
}

export const update = (empleado, request) => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/updateEmpleado',
      method: HTTP_METHOD_POST,
      data: { ...request },
      query: { empleado }
    })
      .request()
      .then(response => {
        const { data = {} } = response
        resolve(data)
      })
      .catch(error => {
        const { data = {} } = error
        reject(data)
      })
  })
}

export const erase = empleado => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/deleteEmpleado',
      method: HTTP_METHOD_POST,
      data: { empleado }
    })
      .request()
      .then(response => {
        const { data = {} } = response
        resolve(data)
      })
      .catch(error => {
        const { data = {} } = error
        reject(data)
      })
  })
}
