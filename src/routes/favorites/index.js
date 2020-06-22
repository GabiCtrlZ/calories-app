const express = require('express')

const { isLoggedIn } = require('../../auth')

const router = express.Router()

const createFavorite = require('./create')
const remove = require('./remove')

router.post('/create', [isLoggedIn], createFavorite)
router.post('/delete', [isLoggedIn], remove)

module.exports = router
