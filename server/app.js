const express = require('express')
const path = require('path')
const app = express()

const { User, Flashcard, Session } = require('./db/models')

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client/index.html'))
})

app.use('/public', express.static(path.join(__dirname, '..', 'public')))

// ------ routes

app.get('/flashcards', (req, res, next) => {
  Flashcard.findAll()
    .then(flashcards => res.send(flashcards))
    .catch(next)
})

module.exports = app
