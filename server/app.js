const express = require('express')
const path = require('path')
const app = express()
const session = require('express-session')

const { User, Flashcard, Session, SessionCard } = require('./db/models')

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
)

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

app.get('/flashcard/:result', (req, res, next) => {
  Flashcard.getRandomFlashcard(req.session.sessionId, req.params.result)
    .then(flashcard => res.send(flashcard))
    .catch(next)
})

app.get('/auth', (req, res, next) => {
  res.send(req.session.user)
  next()
})

// ------ post routes

app.post('/session', (req, res, next) => {
  Session.initializeSession(req.body.id)
    .then(session => {
      req.session.sessionId = session.id
      res.send(session)
    })
    .catch(next)
})

app.post('/sessionCard', (req, res, next) => {
  SessionCard.create(req.body)
    .then(sessionCard => res.send(sessionCard))
    .catch(next)
})

app.post('/login', (req, res, next) => {
  User.confirmCredentials(req.body)
    .then(user => {
      req.session.user = user
      res.send(user)
    })
    .catch(next)
})

// ------ put routes

app.put('/sessionCard/:id', (req, res, next) => {
  SessionCard.updateSessionCard(req.params.id, req.body.result)
    .then(sessionCard => res.send(sessionCard))
    .catch(next)
})

// ------ error handling endware

app.use((err, req, res, next) => {
  console.log(err.message)
  res.status(500).send(err.message)
})

module.exports = app
