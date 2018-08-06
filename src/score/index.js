'use strict'

function register (server, options) {
  const routes = require('./routes')(server)
  server.route(routes)

  server.log('info', 'Plugin registered: module-score')
}

exports.plugin = {
  name: 'module-score',
  version: '0.1.0',
  register
}
