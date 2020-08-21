let {setupDb} = require('./utils/DB/setup')
let config = require('./config').default

const connection_string = config.CONNECTION_STRING
const db_name = config.DB_NAME

const db = setupDb(connection_string, db_name)

exports.default = db