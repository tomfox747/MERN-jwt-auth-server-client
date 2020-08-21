let express = require('express')
let jwt = require('jsonwebtoken')
let cookie = require('cookie-parser')
let config = require('../config').default
let {db_sign_in_function} = require('../services/DB/sign_in')
let {authenticateToken, generateAccessToken} = require('../services/JWT/auth')

const router = express.Router()

router.post('/login', async (req,res) =>{
    console.log("authentication requested")
    let email = req.body.email
    let password = req.body.password
    
    try{
        let user = await db_sign_in_function(email, password)
        let refresh_token = jwt.sign(user, config.REFRESH_TOKEN_SECRET)
        let access_token = generateAccessToken(user)
        res.json({access_token:access_token, refresh_token:refresh_token})
    }catch(e){
        if(e.type === "custom"){
            res.status(e.code).send(e.message)
            return
        }
        
        res.status(500).send("internal server error")
    }
})

router.post('/refresh_token', async (req,res) =>{
    console.log("new token requested")
    let refresh_token = req.body.refresh_token
    jwt.verify(refresh_token, config.REFRESH_TOKEN_SECRET, (err, user) =>{
        console.log(user)
        let access_token = generateAccessToken({email:user.email, name:user.name})
        res.json({access_token:access_token})
    })
})

module.exports = router