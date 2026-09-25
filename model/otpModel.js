//WE ARE NO LONGER USING THIS MODEL, WE ARE INCLUDING THE OTP AS A KEY IN THE USER MODEL. SO THIS FILE IS NO LONGER NEEDED. I AM KEEPING IT HERE FOR REFERENCE PURPOSES ONLY.

const mongoose = require('mongoose')
const otpSchema = new mongoose.Schema({
    email: {type: String, required: true, trim: true},
    otp: {type: String, required: true, trim: true},
    createdAt: {type: Date, default: Date.now, expires: 300} //this means the otp will expire after 5 minutes
})

module.exports = mongoose.model('OTP', otpSchema)