import * as NotificationsService from '../_services/notifications.service'
import { handleError } from '../_utils'
import { stageToast } from './toast.actions'
import { hideLoader, showLoader } from './loading.actions'

import { NOTIFICATIONS_CONSTANTS } from '../_constants'

export const subscribe = () => dispatch => {
  const client = NotificationsService.getClient()

  client.onOpen(() =>
    dispatch({ type: NOTIFICATIONS_CONSTANTS.ACTION_CLIENT_CONNECTED })
  )
  client.onMessage(data => {
    dispatch({
      type: NOTIFICATIONS_CONSTANTS.ACTION_REFRESH_NOTIFICATIONS,
      data
    })
  })
  client.onError(handleError)

  client.listen()
}

export const getUnRead = () => dispatch => {
  return NotificationsService.getAll({
    page: 0,
    size: 1,
    status: 0
  })
    .then(response => {
      const {
        data: { totalElements: data }
      } = response

      dispatch({
        type: NOTIFICATIONS_CONSTANTS.ACTION_GET_UNREAD,
        data
      })
    })
    .catch(error => {
      dispatch(
        stageToast({
          message: 'Ocurrió un error al solicitar las notificaciones',
          type: 'error'
        })
      )

      throw error
    })
}

export const getRead = () => dispatch => {
  return NotificationsService.getAll({
    page: 0,
    size: 1,
    status: 1
  })
    .then(response => {
      const {
        data: { totalElements: data }
      } = response

      dispatch({
        type: NOTIFICATIONS_CONSTANTS.ACTION_GET_READ,
        data
      })
    })
    .catch(error => {
      dispatch(
        stageToast({
          message: 'Ocurrió un error al solicitar las notificaciones',
          type: 'error'
        })
      )

      throw error
    })
}

export const getNotifications = pagination => dispatch => {
  return NotificationsService.getAll(pagination)
    .then(response => {
      const { data } = response

      dispatch({
        type: NOTIFICATIONS_CONSTANTS.ACTION_GET_NOTIFICATIONS,
        data
      })
    })
    .catch(error => {
      dispatch(
        stageToast({
          message: 'Ocurrió un error al solicitar las notificaciones',
          type: 'error'
        })
      )

      throw error
    })
}

export const markNotificationAsRead = idNotificacion => dispatch => {
  dispatch(showLoader())
  return NotificationsService.markAsRead(idNotificacion)
    .then(() => {
      dispatch(hideLoader())
      dispatch({
        type: NOTIFICATIONS_CONSTANTS.ACTION_MARK_AS_READ
      })

      dispatch({
        type: NOTIFICATIONS_CONSTANTS.ACTION_REFRESH_NOTIFICATIONS
      })
    })
    .catch(error => {
      dispatch(hideLoader())
      dispatch(
        stageToast({
          message: 'Ocurrió un error al procesar la notificación',
          type: 'error'
        })
      )

      throw error
    })
}

export const markAllNotificationsAsRead = () => dispatch => {
  dispatch(showLoader())
  return NotificationsService.markAllAsRead()
    .then(() => {
      dispatch(hideLoader())
      dispatch({
        type: NOTIFICATIONS_CONSTANTS.ACTION_MARK_ALL_AS_READ
      })

      dispatch({
        type: NOTIFICATIONS_CONSTANTS.ACTION_REFRESH_NOTIFICATIONS
      })
    })
    .catch(error => {
      dispatch(hideLoader())
      dispatch(
        stageToast({
          message: 'Ocurrió un error al procesar las notificaciones',
          type: 'error'
        })
      )

      throw error
    })
}

export const resetNotifications = () => dispatch => {
  dispatch({ type: NOTIFICATIONS_CONSTANTS.ACTION_RESET_NOTIFICATIONS })
}
