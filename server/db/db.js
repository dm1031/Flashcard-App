const Sequelize = require('sequelize')

module.exports = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/flashcard_db'
)
