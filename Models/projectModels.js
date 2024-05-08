const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    overview:{
        type:String,
        required:true,
        // unique:true
    },
    projectImage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
    
})

const projects = mongoose.model("projects",projectSchema)
module.exports = projects