import expressCacheRoute from 'express-cache-route'

import { request } from '../../utils/ClientHTTPRequest'
import LOG from '../../commons/log'

import { replacePathParams } from '../../utils/stringUtils'
import {
  PROTOCOL_COMISIONES,
  HOST_COMISIONES,
  PORT_COMISIONES,
  HTTP_METHOD_GET,
  API_PATH_CATALOGOS,
  HTTP_STATUS_CODE_200,
  HTTP_STATUS_CODE_500,
  ROUTE_PARAM_CATALOGO_TIPO_EMPLEADO,
  ROUTE_PARAM_CATALOGO_ESTATUS_EMPLEADO,
  ROUTE_PARAM_CATALOGO_PERFIL_EMPLEADO,
  ROUTE_PARAM_CATALOGO_GENERO,
  ROUTE_PARAM_CATALOGO_TIPO_CLIENTE,
  ROUTE_PARAM_CATALOGO_TIPO_SERVICIO,
  ROUTE_PARAM_CATALOGO_PORCENTAJE_COMISION,
  ROUTE_PARAM_CATALOGO_PAGO_CONCEPTO,
  ROUTE_PARAM_CATALOGO_ROL
} from '../../commons/constants'
import { isEmptyObject } from '../../utils/objectUtils'

const cache = expressCacheRoute({ expire: 60 * 5 })

export default router => {
  const serviceHandler = (config, catalogo) => (req, res) => {
    const { body, query, headers: clientHeaders } = req
    LOG.info(`[${config.name}.BODY: ${JSON.stringify(body)}]`)
    const headers = { ...clientHeaders }

    const { protocol, host, port, path: rawPath, method } = config
    let path = replacePathParams({ rawPath, query: { catalogo } })

    if (!isEmptyObject(query)) {
      const searchParams = new URLSearchParams(query)
      path = `${path}?${searchParams.toString()}`
    }

    request({
      protocol,
      host,
      port,
      path,
      method,
      headers,
      body
    })
      .then(response => {
        const responseJSON = JSON.parse(response)
        LOG.info(`[${config.name} Exitoso: ${response}]`)

        return res.status(HTTP_STATUS_CODE_200).send(responseJSON)
      })
      .catch(err => {
        LOG.error(`[${config.name} Error: ${err}]`)
        const parsedError = JSON.parse(err)
        const statusCode = parsedError.statusCode || HTTP_STATUS_CODE_500
        return res.status(statusCode).send(parsedError)
      })
  }

  const getTipoEmpleado = serviceHandler(
    {
      name: 'getTipoEmpleado',
      protocol: PROTOCOL_COMISIONES,
      host: HOST_COMISIONES,
      port: PORT_COMISIONES,
      method: HTTP_METHOD_GET,
      path: API_PATH_CATALOGOS
    },
    ROUTE_PARAM_CATALOGO_TIPO_EMPLEADO
  )

  const getEstatusEmpleado = serviceHandler(
    {
      name: 'getEstatusEmpleado',
      protocol: PROTOCOL_COMISIONES,
      host: HOST_COMISIONES,
      port: PORT_COMISIONES,
      method: HTTP_METHOD_GET,
      path: API_PATH_CATALOGOS
    },
    ROUTE_PARAM_CATALOGO_ESTATUS_EMPLEADO
  )

  const getPerfilEmpleado = serviceHandler(
    {
      name: 'getPerfilEmpleado',
      protocol: PROTOCOL_COMISIONES,
      host: HOST_COMISIONES,
      port: PORT_COMISIONES,
      method: HTTP_METHOD_GET,
      path: API_PATH_CATALOGOS
    },
    ROUTE_PARAM_CATALOGO_PERFIL_EMPLEADO
  )

  const getGenero = serviceHandler(
    {
      name: 'getGenero',
      protocol: PROTOCOL_COMISIONES,
      host: HOST_COMISIONES,
      port: PORT_COMISIONES,
      method: HTTP_METHOD_GET,
      path: API_PATH_CATALOGOS
    },
    ROUTE_PARAM_CATALOGO_GENERO
  )

  const getTipoCliente = serviceHandler(
    {
      name: 'getTipoCliente',
      protocol: PROTOCOL_COMISIONES,
      host: HOST_COMISIONES,
      port: PORT_COMISIONES,
      method: HTTP_METHOD_GET,
      path: API_PATH_CATALOGOS
    },
    ROUTE_PARAM_CATALOGO_TIPO_CLIENTE
  )

  const getTipoServicio = serviceHandler(
    {
      name: 'getTipoServicio',
      protocol: PROTOCOL_COMISIONES,
      host: HOST_COMISIONES,
      port: PORT_COMISIONES,
      method: HTTP_METHOD_GET,
      path: API_PATH_CATALOGOS
    },
    ROUTE_PARAM_CATALOGO_TIPO_SERVICIO
  )

  const getPorcentajeComision = serviceHandler(
    {
      name: 'getPorcentajeComision',
      protocol: PROTOCOL_COMISIONES,
      host: HOST_COMISIONES,
      port: PORT_COMISIONES,
      method: HTTP_METHOD_GET,
      path: API_PATH_CATALOGOS
    },
    ROUTE_PARAM_CATALOGO_PORCENTAJE_COMISION
  )

  const getPagoConcepto = serviceHandler(
    {
      name: 'getPagoConcepto',
      protocol: PROTOCOL_COMISIONES,
      host: HOST_COMISIONES,
      port: PORT_COMISIONES,
      method: HTTP_METHOD_GET,
      path: API_PATH_CATALOGOS
    },
    ROUTE_PARAM_CATALOGO_PAGO_CONCEPTO
  )

  const getRol = serviceHandler(
    {
      name: 'getRol',
      protocol: PROTOCOL_COMISIONES,
      host: HOST_COMISIONES,
      port: PORT_COMISIONES,
      method: HTTP_METHOD_GET,
      path: API_PATH_CATALOGOS
    },
    ROUTE_PARAM_CATALOGO_ROL
  )

  router.post('/getTipoEmpleado', cache.route(), getTipoEmpleado)
  router.post('/getEstatusEmpleado', cache.route(), getEstatusEmpleado)
  router.post('/getPerfilEmpleado', cache.route(), getPerfilEmpleado)
  router.post('/getGenero', cache.route(), getGenero)
  router.post('/getTipoCliente', cache.route(), getTipoCliente)
  router.post('/getTipoServicio', cache.route(), getTipoServicio)
  router.post('/getPorcentajeComision', cache.route(), getPorcentajeComision)
  router.post('/getPagoConcepto', cache.route(), getPagoConcepto)
  router.post('/getRol', cache.route(), getRol)
}
