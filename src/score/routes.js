'use strict'

module.exports = (server) => {
  const handlers = require('./handlers')(server)

  return [
    {
      method: 'GET',
      path: '/',
      options: handlers.get
    },
    {
      method: 'POST',
      path: '/',
      options: handlers.create
    }
  ]
}
