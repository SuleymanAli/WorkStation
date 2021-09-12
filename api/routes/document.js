const fs = require('fs')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const Document = require('../models/document')
const { verify } = require('../middleware')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'static/')
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'application/pdf') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
})

router.post('/create', verify, upload.single('file'), (req, res) => {
  Document({
    name: req.body.name,
    file: req.file.filename
  })
    .save()
    .then((newDocument) => {
      res.status(200).json(newDocument)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
})

router.get('/show/:id', verify, async (req, res) => {
  const doc = await Document.findById(req.params.id)

  try {
    res.json(doc)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/all', verify, async (req, res) => {
  const doc = await Document.find()

  try {
    res.json(doc)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.patch('/update/:id', verify, async (req, res) => {
  try {
    const doc = await Document.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(doc)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.delete('/delete/:id', verify, async (req, res) => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.id)
    if (!doc) res.status(404).json('No item found')
    fs.unlink('static/' + doc.file, (err) => {
      if (err) {
        console.error(err)
      }
    })
    res.status(200).json('Successfully Deleted')
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
