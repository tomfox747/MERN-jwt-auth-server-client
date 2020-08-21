let express = require('express')

const router = express.Router()

router.get('/check', (req,res)  =>{
    console.log("server response was requested")
    res.send('success')
})

module.exports = router