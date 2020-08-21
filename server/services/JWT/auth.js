let jwt = require('jsonwebtoken')
let config = require('../../config').default
let {CustomError} = require('../../utils/errorHandlers/custom_error')

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null){
        return res.status(401)
    }
    try{
        jwt.verify(token, config.ACCESS_TOKEN_SECRET,(err,user) =>{
            if(err){
                if(err.message === "jwt expired"){
                    throw new CustomError("jwt","jwt expired", 400)
                }
                throw new CustomError("custom","could not verify jwt token", 400)
            }
            console.log("token authenticated")
            req.user = user
            next()
        })
    }catch(err){
        res.statusMessage = err.message
        res.status(400).end()
    }
    
}


function generateAccessToken(user){
    return jwt.sign(user, config.ACCESS_TOKEN_SECRET, {expiresIn: 15})
}

module.exports = {
    authenticateToken,
    generateAccessToken
}