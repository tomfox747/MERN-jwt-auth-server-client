let {userModel} = require('../../schemas/user')
let {CustomError} = require('../../utils/errorHandlers/custom_error')

const db_sign_in_function = async (email, password) =>{
    
    try{
        let user = await userModel.findOne({email:email}).lean().exec().then((doc) => doc)
        console.log(user)
        if (!user || user === null){
            throw new CustomError("custom", "no user found", 333)
        }
        
        if (user.password !== password){
            throw new CustomError("custom", "incorrect password", 333)
        }

        return user
    }catch(e){
        if(e.type ==="custom"){
            throw new CustomError(e.type, e.message, e.code)
        }

        throw new CustomError("internal","internal server error",500)
    }
}

module.exports = {
    db_sign_in_function
}