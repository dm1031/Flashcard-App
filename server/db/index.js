const db = require('./db')
const { User, Flashcard, Session, SessionCard } = require('./models')

const initDb = (force = false) => {
  return db
    .authenticate()
    .then(() => {
      Flashcard.belongsToMany(Session, { through: SessionCard })
      Session.hasMany(Flashcard)

      Session.belongsTo(User)
      User.hasMany(Session)

      return db.sync({ force })
    })
    .then(() => console.log('db synced!'))
}

module.exports = initDb
