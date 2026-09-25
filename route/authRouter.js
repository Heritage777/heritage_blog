const express = require('express')
const authRouter = express.Router()
const { signup_get, login_get, signup_post, login_post, logout_get, changePassword_get, changePassword_post } = require('../controller/authController')
const { requireAuth } = require('../middleware/authMiddleware')


authRouter.get('/signup', signup_get)
authRouter.get('/login', login_get)

authRouter.post('/signup', signup_post)
authRouter.post('/login', login_post)

authRouter.get('/logout', logout_get)

authRouter.get('/change-password', requireAuth, changePassword_get)
authRouter.post('/change-password', requireAuth, changePassword_post)

module.exports = authRouter