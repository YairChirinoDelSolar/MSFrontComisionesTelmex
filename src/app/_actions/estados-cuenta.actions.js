import { showLoader, hideLoader } from './loading.actions'
import { stageToast } from './toast.actions'
import * as EstadosCuentaService from '../_services/estados-cuenta.service'

import { ESTADOS_CUENTA_CONSTANTS } from '../_constants'

export const procesarArchivoEdoCuenta = fecha => dispatch => {
  dispatch(showLoader())
  return EstadosCuentaService.procesarArchivoEdoCuenta(fecha)
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: ESTADOS_CUENTA_CONSTANTS.ACTION_PROCESAR_ARCHIVO,
        data
      })

      dispatch(
        stageToast({
          message: 'Petición de procesamiento enviada correctamente',
          type: 'success'
        })
      )
    })
    .catch(error => {
      dispatch(hideLoader())

      dispatch(
        stageToast({
          message: 'Ocurrió un error al enviar la petición',
          type: 'error'
        })
      )

      throw error
    })
}

export const consultarEstadoCuenta = check => dispatch => {
  dispatch(showLoader())
  return EstadosCuentaService.consultarEstadoCuenta(check)
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: ESTADOS_CUENTA_CONSTANTS.ACTION_CONSULTAR_ESTADO_CUENTA,
        data
      })
    })
    .catch(error => {
      dispatch(hideLoader())
      throw error
    })
}

export const getEstadosCuenta = pagination => dispatch => {
  dispatch(showLoader())
  return EstadosCuentaService.getEstadosCuenta(pagination)
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: ESTADOS_CUENTA_CONSTANTS.ACTION_GET_ESTADOS_CUENTA,
        data
      })
    })
    .catch(error => {
      dispatch(hideLoader())

      dispatch(
        stageToast({
          message: 'Ocurrió un error al solicitar los estados de cuenta',
          type: 'error'
        })
      )

      throw error
    })
}

export const getDetalleCuenta = (cuenta, pagination) => dispatch => {
  dispatch(showLoader())
  return EstadosCuentaService.getDetalleCuenta(cuenta, pagination)
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: ESTADOS_CUENTA_CONSTANTS.ACTION_GET_DETALLE_CUENTA,
        data
      })
    })
    .catch(error => {
      dispatch(hideLoader())

      dispatch(
        stageToast({
          message: 'Ocurrió un error al solicitar el detalle de cuenta',
          type: 'error'
        })
      )

      throw error
    })
}

export const deleteEstadoCuenta = idEstadoCuenta => dispatch => {
  dispatch(showLoader())
  return EstadosCuentaService.erase(idEstadoCuenta)
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: ESTADOS_CUENTA_CONSTANTS.ACTION_DELETE_ESTADO_CUENTA,
        data
      })

      dispatch(
        stageToast({
          message: 'Estado de cuenta eliminado correctamente',
          type: 'success'
        })
      )
    })
    .catch(error => {
      dispatch(hideLoader())

      dispatch(
        stageToast({
          message: 'Ocurrió un error al eliminar el estado de cuenta',
          type: 'error'
        })
      )

      throw error
    })
}

export const calculateEstadoCuenta =
  (idEmpleado, idEstadoCuenta) => dispatch => {
    dispatch(showLoader())
    return EstadosCuentaService.calculate(idEmpleado, idEstadoCuenta)
      .then(response => {
        dispatch(hideLoader())
        const { data = [] } = response

        dispatch({
          type: ESTADOS_CUENTA_CONSTANTS.ACTION_CALCULATE_ESTADO_CUENTA,
          data
        })

        dispatch(
          stageToast({
            message: 'Estado de cuenta procesado correctamente',
            type: 'success'
          })
        )
      })
      .catch(error => {
        dispatch(hideLoader())
        const { message = '' } = error

        dispatch(
          stageToast({
            message:
              message || 'Ocurrió un error al procesar el estado de cuenta',
            type: 'error'
          })
        )

        throw error
      })
  }

export const resetEstadosCuenta = () => dispatch => {
  dispatch({
    type: ESTADOS_CUENTA_CONSTANTS.ACTION_RESET_ESTADOS_CUENTA
  })
}

export const resetDetalleCuenta = () => dispatch => {
  dispatch({
    type: ESTADOS_CUENTA_CONSTANTS.ACTION_RESET_DETALLE_CUENTA
  })
}
