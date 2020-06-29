const express = require('express')

const router = express.Router()

const users = require('./users')
const calories = require('./calories')
const favorites = require('./favorites')
const logs = require('./logs')
const meals = require('./meals')

router.use('/users', users)
router.use('/calories', calories)
router.use('/favorites', favorites)
router.use('/logs', logs)
router.use('/meals', meals)

module.exports = router
