import { serviceHandler } from '../serviceHandler'
import {
  API_PATH_USER,
  HOST_COMISIONES,
  HTTP_METHOD_GET,
  HTTP_METHOD_POST,
  PORT_COMISIONES,
  PROTOCOL_COMISIONES
} from '../../commons/constants'

export default router => {
  const getProfile = serviceHandler({
    name: 'getProfile',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_USER.PROFILE,
    method: HTTP_METHOD_GET
  })

  const getACL = serviceHandler({
    name: 'getACL',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_USER.ACL,
    method: HTTP_METHOD_GET
  })

  const createUser = serviceHandler({
    name: 'createUser',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_USER.CREATE,
    method: HTTP_METHOD_POST
  })

  router.post('/getProfile', getProfile)
  router.post('/getACL', getACL)
  router.post('/createUser', createUser)
}
