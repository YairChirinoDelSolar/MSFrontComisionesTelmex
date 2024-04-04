import LOG from '../commons/log'
import { replacePathParams } from '../utils/stringUtils'
import { isEmptyObject } from '../utils/objectUtils'
import { request } from '../utils/ClientHTTPRequest'
import {
  HTTP_STATUS_CODE_200,
  HTTP_STATUS_CODE_500
} from '../commons/constants'

export const serviceHandler = config => (req, res) => {
  const { body, query, headers: clientHeaders } = req
  LOG.info(`[${config.name}.BODY: ${JSON.stringify(body)}]`)
  const headers = { 'Content-Type': 'application/json', ...clientHeaders }

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
