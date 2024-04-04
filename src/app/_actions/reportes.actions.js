import { showLoader, hideLoader } from './loading.actions'
import { stageToast } from './toast.actions'
import * as ReportesService from '../_services/reportes.service'

import { REPORTES_CONSTANTS } from '../_constants'

export const getReporte = pagination => dispatch => {
  dispatch(showLoader())
  return ReportesService.getAll(pagination)
    .then(response => {
      dispatch(hideLoader())
      const { data = [] } = response

      dispatch({
        type: REPORTES_CONSTANTS.ACTION_GET_REPORTE,
        data
      })
    })
    .catch(error => {
      dispatch(hideLoader())

      dispatch(
        stageToast({
          message: 'Ocurrió un error al solicitar el reporte',
          type: 'error'
        })
      )

      throw error
    })
}

export const resetReporte = () => dispatch => {
  dispatch({
    type: REPORTES_CONSTANTS.ACTION_RESET_REPORTE
  })
}
