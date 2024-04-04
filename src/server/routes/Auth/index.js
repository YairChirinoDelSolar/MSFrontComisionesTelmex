import LOG from '../../commons/log'

import {
  API_PATH_AUTH,
  HOST_COMISIONES,
  HTTP_METHOD_POST,
  HTTP_STATUS_CODE_200,
  HTTP_STATUS_CODE_500,
  PORT_COMISIONES,
  PROTOCOL_COMISIONES
} from '../../commons/constants'
import { replacePathParams } from '../../utils/stringUtils'
import { isEmptyObject } from '../../utils/objectUtils'
import { request } from '../../utils/ClientHTTPRequest'

export default router => {
  const serviceHander = config => (req, res) => {
    const { body, query } = req
    LOG.info(`[${config.name}.BODY: ${JSON.stringify(body)}]`)
    const headers = { 'Content-Type': 'application/json' }

    const { protocol, host, port, path: rawPath, method } = config
    let path = replacePathParams({ rawPath, body, query })

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
      body,
      includeCookies: true
    })
      .then(response => {
        const { body, headers } = JSON.parse(response)
        const sessionCookie = headers['set-cookie']
        return res
          .status(HTTP_STATUS_CODE_200)
          .setHeader('Set-Cookie', sessionCookie)
          .send(body)
      })
      .catch(err => {
        LOG.error(`[${config.name} Error: ${err}]`)
        const parsedError = JSON.parse(err)
        const statusCode = parsedError.statusCode || HTTP_STATUS_CODE_500
        return res.status(statusCode).send(parsedError)
      })
  }

  const login = serviceHander({
    name: 'postLogin',
    protocol: PROTOCOL_COMISIONES,
    host: HOST_COMISIONES,
    port: PORT_COMISIONES,
    path: API_PATH_AUTH.LOGIN,
    method: HTTP_METHOD_POST
  })

  router.post('/auth/login', login)
}
