const express = require('express')
const mongoose = require('mongoose')
const app = express()
// const bodyParser = require('body-parser')
const bodyParser = require('body-parser')
const authRoute = require('./routes/auth')
const documentRoute = require('./routes/document')
const jsonParser = bodyParser.json()

// const dbURI = 'mongodb://localhost/authentication'
const dbURI =
  'mongodb+srv://root:admin@cluster0.irajn.gcp.mongodb.net/workstation?retryWrites=true&w=majority'
// app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(jsonParser)
app.use('/auth', authRoute)
app.use('/document', documentRoute)

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = app
