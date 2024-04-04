import { serviceHandler } from '../serviceHandler'
import {
  PROTOCOL_COMISIONES,
  HOST_COMISIONES,
  PORT_COMISIONES,
  HTTP_METHOD_GET,
  HTTP_METHOD_POST,
  HTTP_METHOD_PATCH,
  HTTP_METHOD_DELETE,
  API_PATH_EMPLEADOS
} from '../../commons/constants'

export default router => {
  const getEmpleados = serviceHandler({
    name: 'getEmpleados',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_EMPLEADOS.GET_EMPLEADOS,
    method: HTTP_METHOD_GET
  })

  const getEmpleado = serviceHandler({
    name: 'getEmpleado',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_EMPLEADOS.GET_EMPLEADO,
    method: HTTP_METHOD_GET
  })

  const createEmpleado = serviceHandler({
    name: 'createEmpleado',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_EMPLEADOS.CREATE_EMPLEADO,
    method: HTTP_METHOD_POST
  })

  const updateEmpleado = serviceHandler({
    name: 'updateEmpleado',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_EMPLEADOS.UPDATE_EMPLEADO,
    method: HTTP_METHOD_PATCH
  })

  const deleteEmpleado = serviceHandler({
    name: 'deleteEmpleado',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_EMPLEADOS.DELETE_EMPLEADO,
    method: HTTP_METHOD_DELETE
  })

  router.post('/getEmpleados', getEmpleados)
  router.post('/getEmpleado', getEmpleado)
  router.post('/createEmpleado', createEmpleado)
  router.post('/updateEmpleado', updateEmpleado)
  router.post('/deleteEmpleado', deleteEmpleado)
}
