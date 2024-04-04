import { serviceHandler } from '../serviceHandler'
import {
  PROTOCOL_COMISIONES,
  HOST_COMISIONES,
  PORT_COMISIONES,
  HTTP_METHOD_GET,
  API_PATH_REPORTES
} from '../../commons/constants'

export default router => {
  const getReporte = serviceHandler({
    name: 'getReporte',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_REPORTES.GET_REPORTE,
    method: HTTP_METHOD_GET
  })

  const getReporteExcel = serviceHandler({
    name: 'getReporteExcel',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_REPORTES.GET_REPORTE_EXCEL,
    method: HTTP_METHOD_GET
  })

  router.post('/getReporte', getReporte)
  router.post('/getReporteExcel', getReporteExcel)
}
