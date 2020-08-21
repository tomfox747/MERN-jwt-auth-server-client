let express = require('express')
let bodyparser = require('body-parser')
let cors = require('cors')
let jwt = require('jsonwebtoken')

let health_check_router = require('./routers/health_check')
let authentication_router = require('./routers/authentication_router')
let account_creation_router = require('./routers/account_creation_router')
let get_info_route = require('./routers/get_info')

let app = express()
app.use(cors())
app.use(bodyparser.json())
app.use(express.json())


app.use('/health_check', health_check_router)
app.use('/authenticate', authentication_router)
app.use('/create_account', account_creation_router)
app.use('/getInfo', get_info_route)

module.exports = app