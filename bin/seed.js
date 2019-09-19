const initDb = require('../server/db')
const { User, Flashcard } = require('../server/db/models')
const faker = require('faker')

const createUserInstances = count => {
  const createdUsers = []
  for (let i = 0; i < count; ++i) {
    createdUsers.push({ email: faker.internet.email(), password: '12345' })
  }
  return createdUsers
}

const createFlashcardInstances = count => {
  const createdFlashcards = []
  const root = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  for (let i = 1; i < count; ++i) {
    root.forEach(val =>
      createdFlashcards.push({
        rootFactor: i,
        prompt: `${i} x ${val}`,
        solution: i * val
      })
    )
  }
  return createdFlashcards
}

const syncAndSeed = () => {
  return initDb(true)
    .then(() => {
      const users = createUserInstances(5)
      const flashcards = createFlashcardInstances(12)

      return Promise.all([
        users.map(user => User.create(user)),
        flashcards.map(flashcard => Flashcard.create(flashcard))
      ])
    })
    .then(() => console.log('database seeded!'))
}

module.exports = syncAndSeed
