const express = require('express')

const router = express.Router()

const { isLoggedIn, cookie, authenticate } = require('../../auth')

const login = require('./login')
const create = require('./create')
const updateLight = require('./updateIsLight')


router.post('/login', [authenticate, cookie], login)
router.post('/create', create)
router.post('/user-data', [isLoggedIn], login)
router.post('/update-light', [isLoggedIn], updateLight)

module.exports = router
