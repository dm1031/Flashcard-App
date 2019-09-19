const db = require('../db')
const SessionCard = require('./SessionCard')
const Session = require('./Session')

const {
  getAvailableFlashcardsByResult,
  isFlashcardWithCorrectRootFactor
} = require('../../Utilities')

const Flashcard = db.define('flashcard', {
  id: {
    type: db.Sequelize.UUID,
    primaryKey: true,
    defaultValue: db.Sequelize.UUIDV4
  },
  rootFactor: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
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
  const session = await Session.findByPk(sessionId)

  const sessionCards = await SessionCard.getCardsByResult(
    sessionId,
    result === 'all' ? ['correct', 'incorrect'] : result
  )

  const flashcards = await Flashcard.findAll({ raw: true })
  const flashcardsByFactor = flashcards.filter(fc =>
    isFlashcardWithCorrectRootFactor(fc, session.factors)
  )

  console.log(flashcardsByFactor)

  const availableCards = getAvailableFlashcardsByResult(
    sessionCards,
    flashcardsByFactor,
    result
  )

  const numberOfCards = availableCards.length
  return availableCards[Math.floor(Math.random() * numberOfCards)]
}

module.exports = Flashcard
