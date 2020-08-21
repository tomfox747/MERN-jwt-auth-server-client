class CustomError{
    constructor(type, message, code){
        this.type = type
        this.message = message
        this.code = code
    }
}

module.exports = {
    CustomError
}