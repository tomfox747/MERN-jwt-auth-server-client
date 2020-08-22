const db = require('../../db').default

afterAll(async()=>{
    await db.connection.close()
})