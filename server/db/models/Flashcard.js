const db = require('../db')
const SessionCard = require('./SessionCard')

const { getAvailableFlashcardsByResult } = require('../../Utilities')

const Flashcard = db.define('flashcard', {
  id: {
    type: db.Sequelize.UUID,
    primaryKey: true,
    defaultValue: db.Sequelize.UUIDV4
  },
  prompt: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  solution: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

Flashcard.getRandomFlashcard = async function(sessionId, result) {
  console.log(result)
  const sessionCards = await SessionCard.getCardsByResult(
    sessionId,
    result === 'all' ? ['correct', 'incorrect'] : result
  )

  const flashcards = await Flashcard.findAll({ raw: true })
  const availableCards = getAvailableFlashcardsByResult(
    sessionCards,
    flashcards,
    result
  )
  console.log(availableCards)
  const numberOfCards = availableCards.length
  return availableCards[Math.floor(Math.random() * numberOfCards)]
}

module.exports = Flashcard
