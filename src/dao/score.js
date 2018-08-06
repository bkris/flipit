'use strict'

const Sequelize = require('sequelize')
const Op = Sequelize.Op
const DataTypes = Sequelize.DataTypes

module.exports = (sequelize, server) => {
  const Score = sequelize.define('Score', {
    id: {primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true},
    steps: {type: DataTypes.INTEGER, allowNull: false},
    seconds: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    token: {type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4}
  }, {
    timestamp: false
  })

  function create (score) {
    return Score.create(score)
  }

  function findAll() {
    return Score.findAll()
  }

  function findByToken(token) {
    return Score.findOne({
      where: {
        token: token
      }
    })
  }

  server.method('dao.score.create', create)
  server.method('dao.score.findAll', findAll)
  server.method('dao.score.findByToken', findByToken)

  return Score
}
