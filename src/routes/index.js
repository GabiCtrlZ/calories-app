const express = require('express')

const router = express.Router()

const users = require('./users')
const calories = require('./calories')
const favorites = require('./favorites')

router.use('/users', users)
router.use('/calories', calories)
router.use('/favorites', favorites)

module.exports = router
