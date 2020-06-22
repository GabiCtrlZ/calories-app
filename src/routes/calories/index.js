const express = require('express')

const { isLoggedIn } = require('../../auth')

const router = express.Router()

const update = require('./update')

router.post('/update', [isLoggedIn], update)

module.exports = router
