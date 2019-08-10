const express = require('express')
const path = require('path')
const app = express()

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client/index.html'))
})

app.use('/public', express.static(path.join(__dirname, '..', 'public')))

module.exports = app
