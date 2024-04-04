import { showLoader, hideLoader } from './loading.actions'
import * as CatalogosService from '../_services/catalogos.service'

import { CATALOGOS_CONSTANTS } from '../_constants'

export const getCatalogTipoEmpleado = () => dispatch => {
  dispatch(showLoader())
  return CatalogosService.getCatalogTipoEmpleado()
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: CATALOGOS_CONSTANTS.ACTION_GET_CATALOG_TIPO_EMPLEADO,
        data
      })
    })
    .catch(error => {
      dispatch(hideLoader())
      throw error
    })
}

export const getCatalogEstatusEmpleado = () => dispatch => {
  dispatch(showLoader())
  return CatalogosService.getCatalogEstatusEmpleado()
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: CATALOGOS_CONSTANTS.ACTION_GET_CATALOG_ESTATUS_EMPLEADO,
        data
      })
    })
    .catch(error => {
      dispatch(hideLoader())
      throw error
    })
}

export const getCatalogPerfilEmpleado = () => dispatch => {
  dispatch(showLoader())
  return CatalogosService.getCatalogPerfilEmpleado()
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: CATALOGOS_CONSTANTS.ACTION_GET_CATALOG_PERFIL_EMPLEADO,
        data
      })
    })
    .catch(error => {
      dispatch(hideLoader())
      throw error
    })
}

export const getCatalogGenero = () => dispatch => {
  dispatch(showLoader())
  return CatalogosService.getCatalogGenero()
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: CATALOGOS_CONSTANTS.ACTION_GET_CATALOG_GENERO,
        data
      })
    })
    .catch(error => {
      dispatch(hideLoader())
      throw error
    })
}

export const getCatalogTipoCliente = () => dispatch => {
  dispatch(showLoader())
  return CatalogosService.getCatalogTipoCliente()
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: CATALOGOS_CONSTANTS.ACTION_GET_CATALOG_TIPO_CLIENTE,
        data
      })
    })
    .catch(error => {
      dispatch(hideLoader())
      throw error
    })
}

export const getCatalogTipoServicio = () => dispatch => {
  dispatch(showLoader())
  return CatalogosService.getCatalogTipoServicio()
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: CATALOGOS_CONSTANTS.ACTION_GET_CATALOG_TIPO_SERVICIO,
        data
      })
    })
    .catch(error => {
      dispatch(hideLoader())
      throw error
    })
}

export const getCatalogPorcentajeComision = () => dispatch => {
  dispatch(showLoader())
  return CatalogosService.getCatalogPorcentajeComision()
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: CATALOGOS_CONSTANTS.ACTION_GET_CATALOG_PORCENTAJE_COMISION,
        data
      })
    })
    .catch(error => {
      dispatch(hideLoader())
      throw error
    })
}

export const getCatalogPagoConcepto = () => dispatch => {
  dispatch(showLoader())
  return CatalogosService.getCatalogPagoConcepto()
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: CATALOGOS_CONSTANTS.ACTION_GET_CATALOG_PAGO_CONCEPTO,
        data
      })
    })
    .catch(error => {
      dispatch(hideLoader())
      throw error
    })
}

export const getCatalogRol = () => dispatch => {
  dispatch(showLoader())
  return CatalogosService.getCatalogRol()
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: CATALOGOS_CONSTANTS.ACTION_GET_CATALOG_ROL,
        data
      })
    })
    .catch(error => {
      dispatch(hideLoader())
      throw error
    })
}
