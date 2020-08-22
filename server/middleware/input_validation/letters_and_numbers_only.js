const {CustomError} = require('../../utils/errorHandlers/custom_error')

const validate_inputs_signup = (req,res,next) =>{
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password

    try{
        if(check_inputs(email) !== null && check_inputs(name) !== null && check_inputs(password)){
            next()
        }
    }catch(e){
        res.status(400).send("invalid inputs")
    }

    throw new CustomError("custom", "inputs invalid", 333)
}

const validate_inputs_signin = (req,res,next) =>{
    let email = req.body.email
    let password = req.body.password
    
    try{
        if(check_inputs(email) === null && check_inputs(password) === null){
            next()   
        }
    }catch(e){
        res.status(400).send("invalid inputs")
    }
}

const check_inputs = (input) =>{
    let match_array = input.match(/[^A-Za-z0-9@.]/)
    return match_array
}

module.exports = {
    validate_inputs_signin,
    validate_inputs_signup
}