const express = require('express')
const otpRouter = express.Router()
const {verifyOtp, verifyEmail_get, resendOtp, forgotPassword, forgotPassword_get, resetPassword_get, resetPassword_post, resendResetOtp } = require('../controller/otpController')

otpRouter.get('/verify-email', verifyEmail_get)
otpRouter.post('/verify-otp', verifyOtp)
otpRouter.post('/resend-otp', resendOtp)
otpRouter.get('/forgot-password', forgotPassword_get)
otpRouter.post('/forgot-password', forgotPassword)
otpRouter.get('/reset-password', resetPassword_get)
otpRouter.post('/reset-password', resetPassword_post)
otpRouter.post('/resend-reset-otp', resendResetOtp)

module.exports = otpRouter