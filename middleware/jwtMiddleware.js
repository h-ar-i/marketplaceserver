const jwt = require('jsonwebtoken')
// const { Next } = require('react-bootstrap/esm/PageItem')

const jwtMiddleware = (req,res,next)=>{
    console.log("inside JWT Middleware");
    //get verify token
    const token = req.headers["authorization"].split(" ")[1]
    if(token){
        console.log(token);
        //steps to verify token
       try{
         const jwtResponse = jwt.verify(token,process.env.JWT_SECRET)
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()
        }catch(err){
            res.status(401).json("Authorisation failed...please login")
        }
    }else{
        res.status(406).json("please provide token")
    }
}

module.exports = jwtMiddleware