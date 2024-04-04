import { serviceHandler } from '../serviceHandler'
import {
  PROTOCOL_COMISIONES,
  HOST_COMISIONES,
  PORT_COMISIONES,
  HTTP_METHOD_GET,
  HTTP_METHOD_POST,
  HTTP_METHOD_PATCH,
  HTTP_METHOD_DELETE,
  API_PATH_COMISIONES
} from '../../commons/constants'

export default router => {
  const getComisiones = serviceHandler({
    name: 'getComisiones',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_COMISIONES.GET_COMISIONES,
    method: HTTP_METHOD_GET
  })

  const getComision = serviceHandler({
    name: 'getComision',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_COMISIONES.GET_COMISION,
    method: HTTP_METHOD_GET
  })

  const createComision = serviceHandler({
    name: 'createComision',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_COMISIONES.CREATE_COMISION,
    method: HTTP_METHOD_POST
  })

  const updateComision = serviceHandler({
    name: 'updateComision',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_COMISIONES.UPDATE_COMISION,
    method: HTTP_METHOD_PATCH
  })

  const deleteComision = serviceHandler({
    name: 'deleteComision',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_COMISIONES.DELETE_COMISION,
    method: HTTP_METHOD_DELETE
  })

  router.post('/getComisiones', getComisiones)
  router.post('/getComision', getComision)
  router.post('/createComision', createComision)
  router.post('/updateComision', updateComision)
  router.post('/deleteComision', deleteComision)
}
