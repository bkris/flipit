'use strict'

const Sequelize = require('sequelize')

async function verifyConnection (sequelize, server) {
  try {
    await sequelize.authenticate()
    server.log(['info', 'md-storage'], 'Database connection established successfully!')
  } catch (err) {
    server.log(['error', 'md-storage'], `Unable to connect to database, error: ${err}`)
    throw err
  }
}

async function register (server, options) {
  const sequelize = new Sequelize(options.databaseName, options.username, options.password, {
    host: options.databaseHost,
    // FIXME(snorbi07): these configurations should be passed in as well
    dialect: 'sqlite',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    // SQLite only
    storage: options.sqliteFile
  })
  await verifyConnection(sequelize, server)

  require('./game')(sequelize, server)
  require('./score')(sequelize, server)

  try {
    await sequelize.sync({force: options.dropTables})
    server.log(['info', 'md-storage'], `Database tables ready - dropped tables: ${options.dropTables}`)

    server.log('info', 'Plugin registered: md-storage')
  } catch (err) {
    server.log(['error', 'md-storage'], `Unexpected error occurred: ${err}`)
  }
}

module.exports = {
  plugin: {
    name: 'md-storage',
    version: '0.1.0',
    register
  }
}
