require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require("./DB/connection")

//create an express application
const olxserver = express()

olxserver.use(cors())
olxserver.use(express.json())
olxserver.use(router)
olxserver.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

olxserver.listen(PORT,()=>{
    console.log(`project started @ ${PORT}`);
})

olxserver.get("/",(req,res)=>{
    res.status(200).send(`<h1>server started and waiting for response !!!<h1/>`)
})