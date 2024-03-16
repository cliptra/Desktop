const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
  next()
})

router.get('/', (req, res) => {
    return res.send(`Incorrect request`)
})

module.exports = router