'use strict'

module.exports = (server) => {
  const handlers = require('./handlers')(server)

  return [
    {
      method: 'GET',
      path: '/{size}',
      options: handlers.get
    }
  ]
}
