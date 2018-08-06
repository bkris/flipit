'use strict'

const Joi = require('joi')
const Boom = require('boom')
const {range, random} = require('lodash')

module.exports = (server) => {
  async function newGame (request, h) {
    const CARDS_IN_DECK = 52
    const cards = range(request.params.size).map(index => {
      const randomCard = random(CARDS_IN_DECK)
      return `public/cards/${randomCard}.png`
    })

    return server.methods.dao.game.create({
      cards: cards
    })
  }


  return {
    get: {
      handler: newGame,
      validate: {
        params: {
          size: Joi
            .number()
            .integer()
            .min(0)
            .max(20)
            .required()
        }
      }
    }
  }
}
