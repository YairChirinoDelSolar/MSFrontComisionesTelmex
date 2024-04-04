import { showLoader, hideLoader } from './loading.actions'
import { stageToast } from './toast.actions'
import * as ComisionesService from '../_services/comisiones.service'

import { COMISIONES_CONSTANTS } from '../_constants'

export const getComisiones = pagination => dispatch => {
  dispatch(showLoader())
  return ComisionesService.getAll(pagination)
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: COMISIONES_CONSTANTS.ACTION_GET_COMISIONES,
        data
      })
    })
    .catch(error => {
      dispatch(hideLoader())

      dispatch(
        stageToast({
          message: 'Ocurrió un error al solicitar las comisiones',
          type: 'error'
        })
      )

      throw error
    })
}

export const getComision = idComision => dispatch => {
  dispatch(showLoader())
  return ComisionesService.getOne(idComision)
    .then(response => {
      dispatch(hideLoader())
      const { data = {} } = response

      dispatch({
        type: COMISIONES_CONSTANTS.ACTION_GET_COMISION,
        data
      })
    })
    .catch(error => {
      dispatch(hideLoader())

      dispatch(
        stageToast({
          message: 'Ocurrió un error al solicitar la comisión',
          type: 'error'
        })
      )

      throw error
    })
}

export const getEmptyComision = () => dispatch => {
  const data = ComisionesService.getEmpty()

  dispatch({
    type: COMISIONES_CONSTANTS.ACTION_GET_COMISION,
    data
  })
}

export const createComision = request => dispatch => {
  dispatch(showLoader())
  return ComisionesService.create(request)
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: COMISIONES_CONSTANTS.ACTION_CREATE_COMISION,
        data
      })

      dispatch(
        stageToast({
          message: 'Comisión creada correctamente',
          type: 'success'
        })
      )
    })
    .catch(error => {
      dispatch(hideLoader())

      dispatch(
        stageToast({
          message: 'Ocurrió un error al crear la comisión',
          type: 'error'
        })
      )

      throw error
    })
}

export const updateComision = (idComision, request) => dispatch => {
  dispatch(showLoader())
  return ComisionesService.update(idComision, request)
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: COMISIONES_CONSTANTS.ACTION_UPDATE_COMISION,
        data
      })

      dispatch(
        stageToast({
          message: 'Comisión actualizada correctamente',
          type: 'success'
        })
      )
    })
    .catch(error => {
      dispatch(hideLoader())

      dispatch(
        stageToast({
          message: 'Ocurrió un error al actualizar la comisión',
          type: 'error'
        })
      )

      throw error
    })
}

export const deleteComision = idComision => dispatch => {
  dispatch(showLoader())
  return ComisionesService.erase(idComision)
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: COMISIONES_CONSTANTS.ACTION_DELETE_COMISION,
        data
      })

      dispatch(
        stageToast({
          message: 'Comisión eliminada correctamente',
          type: 'success'
        })
      )
    })
    .catch(error => {
      dispatch(hideLoader())

      dispatch(
        stageToast({
          message: 'Ocurrió un error al eliminar la comisión',
          type: 'error'
        })
      )

      throw error
    })
}

export const resetComisiones = () => dispatch => {
  dispatch({
    type: COMISIONES_CONSTANTS.ACTION_RESET_COMISIONES
  })
}

export const resetComision = () => dispatch => {
  dispatch({
    type: COMISIONES_CONSTANTS.ACTION_RESET_COMISION
  })
}
