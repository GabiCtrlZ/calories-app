const express = require('express')

const { isLoggedIn } = require('../../auth')

const router = express.Router()

const create = require('./create')
const getAll = require('./get-all')

router.post('/create', [isLoggedIn], create)
router.post('/get-all', [isLoggedIn], getAll)

module.exports = router
