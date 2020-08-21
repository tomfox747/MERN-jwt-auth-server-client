let db = require('../db').default

const Schema = db.Schema
const model = db.model

const userSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    refresh_token:{type:String}
}, {collection:'users'})

const userModel = model('users', userSchema)

module.exports = {userModel}