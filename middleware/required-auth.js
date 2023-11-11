const jwt = require('jsonwebtoken');
require('dotenv').config();
const CustomAPIError = require('../error/CustomAPIError');


const requiredAuth = async(req,res,next) =>{
    
    const token = req.cookies.jwtToken;

    if(!token)
    throw new CustomAPIError("Not authorized",401);

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        throw new CustomAPIError("Invalid token",498);
    }

}

module.exports = requiredAuth