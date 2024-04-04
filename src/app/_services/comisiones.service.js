import ClientHttp from '../_helpers/http'
import { HTTP_METHOD_POST } from '../_constants'
import { emptyComision } from '../_data'

export const getAll = ({ page, size, sort }) => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/getComisiones',
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

export const getEmpty = () => emptyComision

export const getOne = comision => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/getComision',
      method: HTTP_METHOD_POST,
      data: { comision }
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
      url: 'api/createComision',
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

export const update = (comision, request) => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/updateComision',
      method: HTTP_METHOD_POST,
      data: { ...request },
      query: { comision }
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

export const erase = comision => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/deleteComision',
      method: HTTP_METHOD_POST,
      data: { comision }
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
