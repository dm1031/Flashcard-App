const db = require('./db')
const { User, Flashcard, Session, SessionCard } = require('./models')

const initDb = (force = false) => {
  return db
    .authenticate()
    .then(() => {
      Session.belongsTo(User)
      User.hasMany(Session)

      Flashcard.belongsToMany(Session, { through: SessionCard })
      Session.hasMany(Flashcard)

      return db.sync({ force })
    })
    .then(() => console.log('db synced!'))
}

module.exports = initDb
