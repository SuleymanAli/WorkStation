const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
// const { verify } = require('../middleware')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const rounds = 10

const tokenSecret = 'my-token-secret'

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) res.status(404).json({ error: req.params.email })
      else {
        bcrypt.compare(req.body.password, user.password, (error, match) => {
          if (error) res.status(500).json(error)
          else if (match) res.status(200).json({ token: generateToken(user) })
          else res.status(403).json({ error: 'passwords do not match' })
        })
      }
    })
    .catch((error) => {
      res.status(500).json(error)
    })
})

router.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, rounds, (error, hash) => {
    if (error) {
      res.status(500).json(error)
    } else {
      const newUser = User({ email: req.body.email, password: hash })
      newUser
        .save()
        .then((user) => {
          res.status(200).json({ token: generateToken(user) })
        })
        .catch((error) => {
          res.status(500).json(error)
        })
    }
  })
})

function generateToken(user) {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: '24h' })
}

module.exports = router
