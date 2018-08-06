'use strict'

const Joi = require('joi')
const Boom = require('boom')
const {isNil} = require('lodash')

module.exports = (server) => {
  async function getListOfScores (request, h) {
    return server.methods.dao.score.findAll()
  }

  async function create (request, h) {
    const game = await server.methods.dao.game.findByToken(request.payload.token)

    if (isNil(game)) {
      throw Boom.notFound(`Could not found the requested game token: ${request.payload.token}`)
    }

    await server.methods.dao.score.create(request.payload)

    return getCurrentPosition(request.payload.token)
  }

  function getCurrentPosition (token) {
    // logic for getting the position in the score list
    return {
      position: 123
    }
  }

  return {
    get: {
      handler: getListOfScores,
    },
    create: {
      handler: create,
      validate: {
        payload: Joi.object({
          steps: Joi.number().integer().min(0),
          seconds: Joi.number().integer().min(0),
          name: Joi.string().required(),
          token: Joi.string().guid().required(),
        })
      }
    },
  }
}
