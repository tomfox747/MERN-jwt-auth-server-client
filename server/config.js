let dotenv = require('dotenv').config({path:__dirname + '/.env'})

const config = {
    CONNECTION_STRING:process.env.CONNECTION_STRING,
    DB_NAME:process.env.DB_NAME,
    PORT:process.env.PORT,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET
}

exports.default = config