const db = require('../db')

const Session = db.define('session', {
  id: {
    type: db.Sequelize.UUID,
    primaryKey: true,
    defaultValue: db.Sequelize.UUIDV4
  },
  timeStarted: {
    type: db.Sequelize.DATE,
    allowNull: false
  },
  timeNeeded: {
    type: db.Sequelize.INTEGER,
    defaultValue: 60,
    allowNull: false
  },
  highScore: {
    type: db.Sequelize.INTEGER
  },
  userId: {
    type: db.Sequelize.UUID
  }
})

Session.initializeSession = function(userId) {
  return Session.create({
    timeStarted: new Date(),
    userId
  })
}

module.exports = Session
