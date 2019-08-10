const db = require('./db')
const { User, Flashcard, Session } = require('./models')

const initDb = (force = false) => {
  return db
    .authenticate()
    .then(() => {
      Flashcard.belongsTo(Session)
      Session.hasMany(Flashcard)

      Session.belongsTo(User)
      User.hasMany(Session)

      return db.sync({ force })
    })
    .then(() => console.log('db synced!'))
}

module.exports = initDb
