'use strict'

const Sequelize = require('sequelize')
const Op = Sequelize.Op
const DataTypes = Sequelize.DataTypes

module.exports = (sequelize, server) => {
  const Game = sequelize.define('Game', {
    id: {primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true},
    cards: {type: DataTypes.JSON, allowNull: false},
    token: {type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4}
  })

  function create (game) {
    return Game.create(game)
  }

  function findByToken(token) {
    return Game.findOne({
      where: {
        token: token
      }
    })
  }

  function findAll() {
    return Game.findAll()
  }

  server.method('dao.game.create', create)
  server.method('dao.game.findAll', findAll)
  server.method('dao.game.findByToken', findByToken)

  return Game
}
