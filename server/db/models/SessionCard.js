const db = require('../db')

const SessionCard = db.define('sessionCard', {
  id: {
    type: db.Sequelize.UUID,
    primaryKey: true,
    defaultValue: db.Sequelize.UUIDV4
  },
  sessionId: {
    type: db.Sequelize.UUID
  },
  flashcardId: {
    type: db.Sequelize.UUID
  },
  result: {
    type: db.Sequelize.ENUM('correct', 'incorrect')
  }
})

module.exports = SessionCard
