import express from 'express'
import fs from 'fs'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'

import { environmentVarsCheck } from './utils/envCheck'
import LOG from './commons/log'
import { IS_SSL_PROTOCOL, API_ROUTES } from './commons/constants'

// Express APP
const app = express()

const PORT = process.env.PORT || 8001
//const BIND = process.env.BIND || '0.0.0.0'

environmentVarsCheck()

const routerAPI = express.Router()

const SSL_PROTOCOL = IS_SSL_PROTOCOL ? 'https' : 'http'
// eslint-disable-next-line import/no-dynamic-require
const server = require(SSL_PROTOCOL).createServer(app)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// public static
app.use(express.static(path.join(__dirname, '../../public')))

const MAX_SIZE_FILE = 512 * 1024 // 512KB en bytes

const loadRoute = directory => {
  fs.readdirSync(path.join(__dirname, 'routes', directory)).forEach(file => {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const filePath = path.join(__dirname, 'routes', directory, file)
    const fileSize = fs.statSync(filePath).size

    if (fileSize < MAX_SIZE_FILE) {
      import(filePath).then(({ default: fn }) => {
        fn(routerAPI)
      })
    }
  })
}

API_ROUTES.forEach(directory => loadRoute(directory))

app.use('/api', routerAPI)

server.listen(PORT, err => {
  if (!err) {
    LOG.info(`API server listening on port ${PORT}`)
  }
})
