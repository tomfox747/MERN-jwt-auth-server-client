let express = require('express')
let jwt = require('jsonwebtoken')
let cookie = require('cookie-parser')
let config = require('../config').default
let {db_sign_in_function} = require('../services/DB/sign_in')
let {generateAccessToken} = require('../middleware/JWT/auth')
let {validate_inputs_signin} = require('../middleware/input_validation/letters_and_numbers_only')

const router = express.Router()

router.post('/login', validate_inputs_signin, async (req,res) =>{
    console.log("authentication requested")
    let email = req.body.email
    let password = req.body.password
    
    try{
        let user = await db_sign_in_function(email, password)
        let refresh_token = jwt.sign(user, config.REFRESH_TOKEN_SECRET)
        let access_token = generateAccessToken(user)
        res.status(200).json({access_token:access_token, refresh_token:refresh_token})
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
    try{
        jwt.verify(refresh_token, config.REFRESH_TOKEN_SECRET, (err, user) =>{
            let access_token = generateAccessToken({email:user.email, name:user.name})
            res.status(200).json({access_token:access_token})
        })
    }catch(e){
        if(e.type === "custom"){
            res.status(e.code).send(e.message)
        }

        res.status(500).send("internal server error")
    }
})

module.exports = router