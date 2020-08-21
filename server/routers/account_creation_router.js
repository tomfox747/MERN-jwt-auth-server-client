let express = require('express')
let config = require('../config').default
let jwt = require('jsonwebtoken')
const {create_account} = require('../services/DB/create_account')
const {CustomError} = require('../utils/errorHandlers/custom_error')

const router = express.Router()

router.post('/create', async (req,res) =>{
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

        res.status(e.code).send(new CustomError("internal", "internal server error", 500))
    }
})

module.exports = router