const express = require('express')

const router = express.Router()

const { isLoggedIn, cookie, authenticate } = require('../../auth')

const login = require('./login')
const register = require('./register')
const updateLight = require('./updateIsLight')


router.post('/login', [authenticate, cookie], login)
router.post('/register', [register, authenticate, cookie], login)
router.post('/user-data', [isLoggedIn], login)
router.post('/update-light', [isLoggedIn], updateLight)

module.exports = router
