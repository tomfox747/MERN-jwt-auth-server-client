const {CustomError} = require('../../utils/errorHandlers/custom_error')

const validate_inputs_signup = (req,res,next) =>{
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password
    
    try{
        if(check_inputs(email) === null && check_inputs(name) === null && check_inputs(password) === null){
            console.log("all good")
            next()
        }else{
            throw new CustomError("custom", "invalid inputs", 400)
        }

    }catch(e){
        if(e.type === "custom"){
            res.status(e.code).send(e.message)
        }
        res.status(500).send("internal server error")
    }
}

const validate_inputs_signin = (req,res,next) =>{
    let email = req.body.email
    let password = req.body.password
    
    try{
        if(check_inputs(email) === null && check_inputs(password) === null){
            next()   
        }else{
            throw new CustomError("custom","invalid inputs",400)
        }
    }catch(e){
        if(e.type === "custom"){
            res.status(e.code).send(e.message)
        }

        res.status(500).send("internal server error")
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