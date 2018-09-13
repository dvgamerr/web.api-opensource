import { debuger } from 'touno.io'
import express from 'express'

import middleware from './middleware'

const port = parseInt(process.env.PORT) || 3000
const app = express()
const logger = debuger.scope('server')

let server = null
const createListenServer = () => new Promise((resolve, reject) => {
  try {
    middleware(app, server)
    server = app.listen(port, () => {
      logger.start(`listening on port ${port}!`)
      resolve()
    })
  } catch (ex) {
    reject(ex)
  }
})

export default {
  async restart () {
    if (server) server.close()
    await createListenServer()
    return app
  }
}
