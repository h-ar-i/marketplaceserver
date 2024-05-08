const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTION_STRING).then(
    result =>{
        console.log("mongodb connected with olx-server");
    }
).catch(err=>{
    console.log("connection failed");
    console.log(err);
})

