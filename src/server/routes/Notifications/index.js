import { serviceHandler } from '../serviceHandler'
import {
  API_PATH_NOTIFICATIONS,
  HOST_COMISIONES,
  HTTP_METHOD_GET,
  HTTP_METHOD_PATCH,
  PORT_COMISIONES,
  PROTOCOL_COMISIONES
} from '../../commons/constants'

export default router => {
  const getNotifications = serviceHandler({
    name: 'getNotifications',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_NOTIFICATIONS.GET_NOTIFICATIONS,
    method: HTTP_METHOD_GET
  })

  const markAsReadNotification = serviceHandler({
    name: 'markAsReadNotification',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_NOTIFICATIONS.READ_NOTIFICATION,
    method: HTTP_METHOD_PATCH
  })

  const markAsReadAllNotifications = serviceHandler({
    name: 'markAsReadAllNotifications',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_NOTIFICATIONS.READ_ALL_NOTIFICATIONS,
    method: HTTP_METHOD_PATCH
  })

  router.post('/getNotifications', getNotifications)
  router.post('/markAsReadNotification', markAsReadNotification)
  router.post('/markAsReadAllNotifications', markAsReadAllNotifications)
}
