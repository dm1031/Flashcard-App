const db = require('../db')

const Session = db.define('session', {
  id: {
    type: db.Sequelize.UUID,
    primaryKey: true,
    defaultValue: db.Sequelize.UUIDV4
  },
  time: {
    type: db.Sequelize.INTEGER,
    allowNull: false
  },
  highScore: {
    type: db.Sequelize.INTEGER
  }
})

module.exports = Session
