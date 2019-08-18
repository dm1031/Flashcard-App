const db = require('../db')
const SessionCard = require('./SessionCard')

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
  const sessionCards = await SessionCard.getCardsByResult(
    sessionId,
    result === 'all' ? ['correct', 'incorrect'] : result
  )

  const flashcards = await Flashcard.findAll({ raw: true })

  let availableCards, numberOfCards

  if (sessionCards.length) {
    const arrayOfFlashcardIds = sessionCards.map(card => card.flashcardId)
    availableCards = flashcards.filter(
      flashcard => arrayOfFlashcardIds.indexOf(flashcard.id) === -1
    )
  } else {
    availableCards = flashcards
  }
  console.log(availableCards)
  numberOfCards = availableCards.length
  return availableCards[Math.floor(Math.random() * numberOfCards)]
}

module.exports = Flashcard
