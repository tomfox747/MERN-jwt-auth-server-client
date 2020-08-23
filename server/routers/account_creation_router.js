let express = require('express')
let config = require('../config').default
let jwt = require('jsonwebtoken')
const {create_account} = require('../services/DB/create_account')
const {CustomError} = require('../utils/errorHandlers/custom_error')
const {authenticateToken} = require('../middleware/JWT/auth')
const {deleteAccount} = require('../services/DB/delete_account')
const {validate_inputs_signup} = require('../middleware/input_validation/letters_and_numbers_only')

const router = express.Router()

router.post('/create', validate_inputs_signup, async (req,res) =>{
    console.log("new account request")

    let user = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }

    try{
        await create_account(user)
        res.status(200).send("account created")
    }catch(e){
        if(e.type === "custom"){
            res.status(e.code).send(e.message)
        }

        res.status(500).send("internal server error")
    }
})

router.post('/delete_account', authenticateToken, async (req,res) =>{
    console.log("account deletion route called")

    try{
        let email = req.user.email
        await deleteAccount(email)
        res.status(200).send("success") 
    }catch(e){
        if(e.type === "custom"){
            res.status(e.code).send(e.message)
        }

        res.status(500).send("internal server error")
    }
})

module.exports = router