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

SessionCard.getCardsByResult = async function(sessionId, result) {
  const sessionCards = await SessionCard.findAll({
    where: {
      sessionId,
      result
    },
    attributes: ['flashcardId'],
    raw: true
  })
  return sessionCards
}

SessionCard.updateSessionCard = async function(sessionCardId, result) {
  const sessionCardToUpdate = await SessionCard.findOne({
    where: { id: sessionCardId }
  })
  return sessionCardToUpdate.update({ result })
}

module.exports = SessionCard
