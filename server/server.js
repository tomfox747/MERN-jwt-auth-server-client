let app = require('./app')
//create and add config file
let config = require('./config').default

const port = config.PORT

app.listen(5000, () =>{
    console.log(`server is running on port ${port}`)
})