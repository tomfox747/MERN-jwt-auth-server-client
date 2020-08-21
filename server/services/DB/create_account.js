let {userModel} = require('../../schemas/user')
let {CustomError} = require('../../utils/errorHandlers/custom_error')

const create_account = async (user) =>{

    try{
        let newUser = new userModel(user)
        await newUser.save()
        return
    }catch(e){
        throw new CustomError("internal","internal server error","500")
    }
}

module.exports = {
    create_account
}