const db = require('../db')

const Session = db.define('session', {
  time: {
    type: db.Sequelize.INTEGER,
    allowNull: false
  },
  highScore: {
    type: db.Sequelize.INTEGER
  }
})

module.exports = Session
