import ClientHttp from '../_helpers/http'
import { HTTP_METHOD_POST } from '../_constants'

export const getCatalogTipoEmpleado = () => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/getTipoEmpleado',
      method: HTTP_METHOD_POST
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

export const getCatalogEstatusEmpleado = () => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/getEstatusEmpleado',
      method: HTTP_METHOD_POST
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

export const getCatalogPerfilEmpleado = () => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/getPerfilEmpleado',
      method: HTTP_METHOD_POST
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

export const getCatalogGenero = () => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/getGenero',
      method: HTTP_METHOD_POST
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

export const getCatalogTipoCliente = () => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/getTipoCliente',
      method: HTTP_METHOD_POST
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

export const getCatalogTipoServicio = () => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/getTipoServicio',
      method: HTTP_METHOD_POST
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

export const getCatalogPorcentajeComision = () => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/getPorcentajeComision',
      method: HTTP_METHOD_POST
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

export const getCatalogPagoConcepto = () => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/getPagoConcepto',
      method: HTTP_METHOD_POST
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

export const getCatalogRol = () => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/getRol',
      method: HTTP_METHOD_POST
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
