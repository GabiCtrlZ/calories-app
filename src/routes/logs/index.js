const express = require('express')

const { isLoggedIn } = require('../../auth')

const router = express.Router()

const create = require('./create')

router.post('/create', [isLoggedIn], create)

module.exports = router
