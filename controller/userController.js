const users = require('../Models/userModel')
const jwt = require ('jsonwebtoken')

exports.register = async (req,res)=>{
    console.log("inside register request");
    const {username,email,password} = req.body
    console.log(username,email,password);
    try{
        //check emil is presnt in the db or  not
        const existingUser = await users.findOne({email})
        //if rmail is presnt then existing user
        if(existingUser){
            res.status(406).json("user already exists")
        }else{
            const newUser = new users({
                username,email,password,location:"",profile:""
            })
            //to store data in mongodb from mongoose model
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }


    //check email is prsent or not
    
}

//login
exports.login = async (req,res) =>{
    console.log("inside login function");
    //get email password from request
    const {email,password} = req.body
    console.log(email,password);
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            //user can login
            //generate token
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_SECRET)
            res.status(200).json({existingUser,token})
        }else{
            res.status(404).json("Incorrect Email/Password")
        }
    }catch(err){
        //incrct email/pw
        res.status(401).json(err)
    }
}