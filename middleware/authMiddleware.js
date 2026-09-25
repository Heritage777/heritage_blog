const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

//GIVE ACCESS ONLY TO THOSE WITH TOKENS
const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'net ninja secret', (err, decodedToken)=>{
        if (err) { console.log(err.message); res.redirect('/login')} 
        else{ console.log(decodedToken); req.user = decodedToken; next()}
        })
    } else{ res.redirect('/login')}

}

//IF USER IS LOGGED IN, CONFIRM HIS IDENTITY
const checkUser = (req, res, next) =>{
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'net ninja secret', async (err, decodedToken)=>{
        if (err) { console.log(err.message); res.locals.user = null; next() } 
        else{
            console.log(decodedToken)
            let user = await User.findById(decodedToken.id)
            res.locals.user = user
            next()
        }
        })
    } 
    else{ res.locals.user = null; next() }

}

module.exports = {requireAuth, checkUser}