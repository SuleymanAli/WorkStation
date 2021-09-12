const mongoose = require('mongoose')

const model = mongoose.Schema({
  name: { type: String, required: true },
  file: { type: String, required: true },
  date: { type: Date, default: Date.now }
})

module.exports = new mongoose.model('Document', model)
