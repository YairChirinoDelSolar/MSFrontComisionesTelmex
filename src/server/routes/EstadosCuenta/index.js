import { serviceHandler } from '../serviceHandler'
import {
  PROTOCOL_COMISIONES,
  HOST_COMISIONES,
  PORT_COMISIONES,
  HTTP_METHOD_GET,
  API_PATH_ESTADOS_CUENTA,
  HTTP_METHOD_DELETE,
  HTTP_METHOD_PATCH
} from '../../commons/constants'

export default router => {
  const procesarArchivoEdoCuenta = serviceHandler({
    name: 'procesarArchivoEdoCuenta',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_ESTADOS_CUENTA.PROCESAR_ARCHIVO,
    method: HTTP_METHOD_GET
  })

  const consultarEstadoCuenta = serviceHandler({
    name: 'consultarEstadoCuenta',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_ESTADOS_CUENTA.CONSULTAR_ESTADO_CUENTA,
    method: HTTP_METHOD_GET
  })

  const getCuentas = serviceHandler({
    name: 'getCuentas',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_ESTADOS_CUENTA.GET_CUENTAS,
    method: HTTP_METHOD_GET
  })

  const getDetalleCuenta = serviceHandler({
    name: 'getDetalleCuenta',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_ESTADOS_CUENTA.GET_DETALLE_CUENTA,
    method: HTTP_METHOD_GET
  })

  const deleteEstadoCuenta = serviceHandler({
    name: 'deleteEstadoCuenta',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_ESTADOS_CUENTA.DELETE_ESTADO_CUENTA,
    method: HTTP_METHOD_DELETE
  })

  const calculateEstadoCuenta = serviceHandler({
    name: 'calculateEstadoCuenta',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_ESTADOS_CUENTA.CALCULATE_ESTADO_CUENTA,
    method: HTTP_METHOD_PATCH
  })

  router.post('/procesarArchivoEdoCuenta', procesarArchivoEdoCuenta)
  router.post('/consultarEstadoCuenta', consultarEstadoCuenta)
  router.post('/getCuentas', getCuentas)
  router.post('/getDetalleCuenta', getDetalleCuenta)
  router.post('/deleteEstadoCuenta', deleteEstadoCuenta)
  router.post('/calculateEstadoCuenta', calculateEstadoCuenta)
}
