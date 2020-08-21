let mongoose = require('mongoose')

const setupDb = (connection_string, db_name) => {

    //connect to the DB
    mongoose.connect(connection_string, {useNewUrlParser:true, useUnifiedTopology:true, dbName:db_name})

    //on connection
    mongoose.connection.on('connected', () =>{
        console.log("successfully connected to the database")
    })

    //on error
    mongoose.connection.on('error', (error) =>{
        console.log("error connecting to the database ", error)
        process.exit(0)
    })

    //on disconnect
    mongoose.connection.on('disconnect', () =>{
        console.log("disconnected from the data")
    })

    //on sigint
    process.on('SIGINT', () =>{
        mongoose.connection.close(() =>{
            process.exit(0)
        })
    })

    return mongoose
}

module.exports = {
    setupDb
}