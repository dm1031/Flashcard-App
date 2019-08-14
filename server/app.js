const express = require('express')
const path = require('path')
const app = express()

const { User, Flashcard, Session, SessionCard } = require('./db/models')

app.use(express.json())

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client/index.html'))
})

app.use('/public', express.static(path.join(__dirname, '..', 'public')))

// ------ get routes

app.get('/flashcards', (req, res, next) => {
  Flashcard.findAll()
    .then(flashcards => res.send(flashcards))
    .catch(next)
})

app.get('/flashcard', (req, res, next) => {
  Flashcard.getRandomFlashcard()
    .then(flashcard => res.send(flashcard))
    .catch(next)
})

// ------ post routes

app.post('/session', (req, res, next) => {
  Session.create({ timeStarted: new Date() })
    .then(session => res.send(session))
    .catch(next)
})

app.post('/sessionCard', (req, res, next) => {
  SessionCard.create(req.body)
    .then(sessionCard => res.send(sessionCard))
    .catch(next)
})

module.exports = app
