const db = require('../db')

const Session = db.define(
  'session',
  {
    id: {
      type: db.Sequelize.UUID,
      primaryKey: true,
      defaultValue: db.Sequelize.UUIDV4
    },
    isTimed: {
      type: db.Sequelize.BOOLEAN,
      allowNull: false
    },
    timeStarted: {
      type: db.Sequelize.DATE,
      allowNull: false
    },
    timeNeeded: {
      type: db.Sequelize.INTEGER,
      allowNull: true
    },
    factors: {
      type: db.Sequelize.ARRAY(db.Sequelize.INTEGER)
    },
    userId: {
      type: db.Sequelize.UUID
    }
  },
  {
    hooks: {
      beforeCreate: function(session) {
        if (!session.isTimed) {
          session.timeNeeded = null
        } else {
          session.timeNeeded = 60
        }
      }
    }
  }
)

Session.initializeSession = function(userId, isTimed) {
  return Session.create({
    timeStarted: new Date(),
    userId,
    isTimed
  })
}

module.exports = Session
