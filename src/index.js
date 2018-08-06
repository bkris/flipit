'use strict';

const Hapi = require('hapi')
const Boom = require('boom')
const path = require('path')
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '/../config/server.js'))[env]
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

const init = async () => {

  const server = Hapi.server({
    debug: {
      log: '*',
      request: '*'
    },
    host: config.host,
    port: config.port,
    routes: {
      validate: {
        failAction: async function validationFailureHandler (request, h, err) {
          if (IS_PRODUCTION) {
            request.log(['error', 'validation'], `validation error occurred: ${err.message}`)
          } else {
            // During development, log and respond with the full error.
            console.error('validation error occurred', err)
          }
          throw Boom.badRequest(`Invalid input`)
        }
      }
    },
  });

  await server.register([
    {
      plugin: require('./game'),
      options: {},
      routes: {
        prefix: '/game'
      }
    },
    {
      plugin: require('./score'),
      options: {},
      routes: {
        prefix: '/score'
      }
    },
    {
      plugin: require('./dao'),
      options: {
        databaseName: 'database',
        username: 'supercharge',
        password: 'supercharge',
        dropTables: false,
        sqliteFile: IS_PRODUCTION ? null : path.join(__dirname, '/supercharge.sqlite')
      }
    },
  ])

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();
