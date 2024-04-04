import http from 'http'
import https from 'https'

import LOG from '../commons/log'
import {
  HTTP_METHOD_DELETE,
  HTTP_METHOD_GET,
  HTTP_STATUS_CODE_200,
  HTTP_STATUS_CODE_201,
  HTTP_STATUS_CODE_202,
  HTTP_STATUS_CODE_401,
  HTTP_STATUS_CODE_404,
  HTTP_STATUS_CODE_500,
  HTTP_TIMEOUT,
  REJECT_UNAUTHORIZED
} from '../commons/constants'

export const request = ({
  protocol,
  host,
  port,
  path,
  method,
  headers,
  body,
  includeCookies
}) => {
  let dataString
  let handler

  const options = {
    protocol,
    host,
    port,
    path,
    method,
    headers,
    timeout: HTTP_TIMEOUT
  }

  return new Promise((resolve, reject) => {
    if (protocol === 'https:') {
      options.requestCert = true
      options.rejectUnauthorized = REJECT_UNAUTHORIZED
      handler = https
    } else if (protocol === 'http:') {
      handler = http
    }

    if (method !== HTTP_METHOD_GET) {
      dataString = JSON.stringify(body)
    }
    options.query = dataString

    if (method === HTTP_METHOD_DELETE) {
      options.headers = {
        ...options.headers,
        'Content-Length': Buffer.byteLength(dataString)
      }
    }

    LOG.debug(`OPTIONS: ${JSON.stringify(options)}`)
    LOG.debug(`BODY: ${dataString}`)

    const req = handler.request(options, res => {
      res.setEncoding('utf8')
      let responseString = ''
      const { headers } = res
      res.on('data', chunk => {
        responseString += chunk
      })

      res.on('end', () => {
        LOG.debug(`RESPONSE: ${responseString}`)
        const statusCode = Number(res.statusCode)

        if (
          statusCode === HTTP_STATUS_CODE_401 ||
          statusCode === HTTP_STATUS_CODE_404
        ) {
          const error = {
            statusCode,
            error: 'Server Error',
            message: responseString,
            path: options.path
          }

          reject(JSON.stringify(error))
        } else if (
          statusCode === HTTP_STATUS_CODE_200 ||
          statusCode === HTTP_STATUS_CODE_201 ||
          statusCode === HTTP_STATUS_CODE_202
        ) {
          try {
            if (responseString === 'null') {
              resolve(JSON.stringify({}))
            } else {
              const completeResponse = {
                body: JSON.parse(responseString),
                headers
              }
              const reponse = includeCookies
                ? JSON.stringify(completeResponse)
                : responseString
              resolve(reponse)
            }
          } catch (e) {
            const error = {
              statusCode: HTTP_STATUS_CODE_500,
              error: 'Server Error',
              message: 'Error en Negocio',
              path: options.path
            }

            reject(JSON.stringify(error))
          }
        } else {
          reject(responseString)
        }
      })
    })

    if (method !== HTTP_METHOD_GET) {
      req.write(dataString)
    }

    req.on('error', e => {
      reject(JSON.stringify(e))
    })

    req.end()
  })
}

export default null
