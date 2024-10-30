const jwt = require("jsonwebtoken");
const User = require("../models/user");
const secret = "Neeraj$2004";

function setUser(user){
    return token = jwt.sign(  //it creates a jwt token 
        {
            id:user._id
        },
        'shhhh', //process.env.jwtseceret
        {
            expiresIn:"2h"
        }
    ); 
    User.token = token;
}


function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token,secret);
    }
    catch(err){
        return null;
    }
}

module.exports = {
    setUser,getUser,
}

