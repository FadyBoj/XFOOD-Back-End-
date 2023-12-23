const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config()

const isAuth = async(req,res,next) =>{

    const token = req.cookies.jwtToken || req.headers.authorization;

    if(!token)
    return next()

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.find({_id:decoded.id});
        req.user = user
        return next()
    } catch (error) {
        throw new CustomAPIError("Invalid token",498);

    }


}

module.exports = isAuth;