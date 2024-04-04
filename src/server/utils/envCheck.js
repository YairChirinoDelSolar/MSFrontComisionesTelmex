import LOG from '../commons/log'
import { BACKEND_SERVER_COMISIONES } from '../commons/constants'

export const environmentVarsCheck = () => {
  LOG.info('Checking environment variables')

  LOG[BACKEND_SERVER_COMISIONES ? 'info' : 'fatal'](
    `BACKEND_SERVER_COMISIONES: ${BACKEND_SERVER_COMISIONES}`
  )
}

export default null
