const db = require('../db')

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

Flashcard.getRandomFlashcard = function() {
  return Flashcard.findAll().then(flashcards => {
    const numberOfCards = flashcards.length
    const randomFlashcard =
      flashcards[Math.floor(Math.random() * numberOfCards)]
    return randomFlashcard
  })
}

module.exports = Flashcard
