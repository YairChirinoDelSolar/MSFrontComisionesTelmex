import { showLoader, hideLoader } from './loading.actions'
import { stageToast } from './toast.actions'
import * as EmpleadosService from '../_services/empleados.service'

import { EMPLEADOS_CONSTANTS } from '../_constants'

export const getEmpleados = pagination => dispatch => {
  dispatch(showLoader())
  return EmpleadosService.getAll(pagination)
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: EMPLEADOS_CONSTANTS.ACTION_GET_EMPLEADOS,
        data
      })
    })
    .catch(error => {
      dispatch(hideLoader())

      dispatch(
        stageToast({
          message: 'Ocurrió un error al solicitar los empleados',
          type: 'error'
        })
      )

      throw error
    })
}

export const getEmpleado = idEmpleado => dispatch => {
  dispatch(showLoader())
  return EmpleadosService.getOne(idEmpleado)
    .then(response => {
      dispatch(hideLoader())
      const { data = {} } = response

      dispatch({
        type: EMPLEADOS_CONSTANTS.ACTION_GET_EMPLEADO,
        data
      })
    })
    .catch(error => {
      dispatch(hideLoader())

      dispatch(
        stageToast({
          message: 'Ocurrió un error al solicitar el empleado',
          type: 'error'
        })
      )

      throw error
    })
}

export const getEmptyEmpleado = () => dispatch => {
  const data = EmpleadosService.getEmpty()

  dispatch({
    type: EMPLEADOS_CONSTANTS.ACTION_GET_EMPLEADO,
    data
  })
}

export const createEmpleado = request => dispatch => {
  dispatch(showLoader())
  return EmpleadosService.create(request)
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: EMPLEADOS_CONSTANTS.ACTION_CREATE_EMPLEADO,
        data
      })

      dispatch(
        stageToast({
          message: 'Empleado creado correctamente',
          type: 'success'
        })
      )
    })
    .catch(error => {
      dispatch(hideLoader())

      dispatch(
        stageToast({
          message: 'Ocurrió un error al crear el empleado',
          type: 'error'
        })
      )

      throw error
    })
}

export const updateEmpleado = (idEmpleado, request) => dispatch => {
  dispatch(showLoader())
  return EmpleadosService.update(idEmpleado, request)
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: EMPLEADOS_CONSTANTS.ACTION_UPDATE_EMPLEADO,
        data
      })

      dispatch(
        stageToast({
          message: 'Empleado actualizado correctamente',
          type: 'success'
        })
      )
    })
    .catch(error => {
      dispatch(hideLoader())

      dispatch(
        stageToast({
          message: 'Ocurrió un error al actualizar el empleado',
          type: 'error'
        })
      )

      throw error
    })
}

export const deleteEmpleado = idEmpleado => dispatch => {
  dispatch(showLoader())
  return EmpleadosService.erase(idEmpleado)
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: EMPLEADOS_CONSTANTS.ACTION_DELETE_EMPLEADO,
        data
      })

      dispatch(
        stageToast({
          message: 'Empleado eliminado correctamente',
          type: 'success'
        })
      )
    })
    .catch(error => {
      dispatch(hideLoader())

      dispatch(
        stageToast({
          message: 'Ocurrió un error al eliminar el empleado',
          type: 'error'
        })
      )

      throw error
    })
}

export const resetEmpleados = () => dispatch => {
  dispatch({
    type: EMPLEADOS_CONSTANTS.ACTION_RESET_EMPLEADOS
  })
}

export const resetEmpleado = () => dispatch => {
  dispatch({
    type: EMPLEADOS_CONSTANTS.ACTION_RESET_EMPLEADO
  })
}
