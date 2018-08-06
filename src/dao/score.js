'use strict'

const Sequelize = require('sequelize')
const Op = Sequelize.Op
const DataTypes = Sequelize.DataTypes

module.exports = (sequelize, server) => {
  const Score = sequelize.define('Score', {
    id: {primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true},
    steps: {type: DataTypes.INTEGER, allowNull: false},
    seconds: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false}
  }, {
    timestamp: false
  })

  function create (score) {
    return Score.create(score)
  }

  function findAll() {
    return Score.findAll()
  }

  server.method('dao.score.create', create)
  server.method('dao.score.findAll', findAll)

  return Score
}
