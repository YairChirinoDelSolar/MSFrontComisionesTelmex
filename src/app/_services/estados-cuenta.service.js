import ClientHttp from '../_helpers/http'
import { HTTP_METHOD_POST } from '../_constants'

export const procesarArchivoEdoCuenta = fecha => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/procesarArchivoEdoCuenta',
      method: HTTP_METHOD_POST,
      data: { fecha }
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

export const consultarEstadoCuenta = check => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/consultarEstadoCuenta',
      method: HTTP_METHOD_POST,
      data: { check }
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

export const getEstadosCuenta = ({ page, size, sort }) => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/getCuentas',
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

export const getDetalleCuenta = (cuenta, { page, size, sort }) => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/getDetalleCuenta',
      method: HTTP_METHOD_POST,
      data: { cuenta },
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

export const erase = cuenta => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/deleteEstadoCuenta',
      method: HTTP_METHOD_POST,
      data: { cuenta }
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

export const calculate = (idEmpleado, idEstadoCuenta) => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/calculateEstadoCuenta',
      method: HTTP_METHOD_POST,
      data: { idEstadoCuenta, idEmpleado, vpAuditoria: 'vpAuditoria' }
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
