require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const Blog = require('./model/blogModel')
const route = require('./route/route')
const authRouter = require('./route/authRouter')
const cookieParser = require('cookie-parser') // Make sure you have cookie-parser installed and required!
const { requireAuth, checkUser } = require('./middleware/authMiddleware')
const otpRouter = require('./route/otpRouter')

// View Engine & Global Middleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser()) // Essential for reading req.cookies.jwt!
app.use(express.static('public'))

// RUN CHECKUSER GLOBALLY ON EVERY REQUEST FIRST
app.use(checkUser)

// Routes
app.use(authRouter)
app.use(route)
app.use(otpRouter)

// Database Connection & Server Start
const dbURI = process.env.dbURI
mongoose.connect(dbURI)
    .then((result) => {
        console.log('Connected to MongoDB Atlas')
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Database connection error:', err)
    })

// 404 Catch-all
app.use((req, res) => {
    res.status(404).render('404')
})