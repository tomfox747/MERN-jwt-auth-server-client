const {userModel} = require('../../schemas/user')
const {CustomError} = require('../../utils/errorHandlers/custom_error')

const deleteAccount = async (email) =>{

    try{
        await userModel.findOneAndDelete({email:email}).exec()
        return
    }catch(e){
        throw new CustomError("custom","could not delete user", 333)
    }
}

module.exports = {
    deleteAccount
}