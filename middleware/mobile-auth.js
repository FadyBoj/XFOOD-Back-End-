const jwt = require('jsonwebtoken');
require('dotenv').config();
const CustomAPIError = require('../error/CustomAPIError');

const mobileAuth = (req,res,next) =>{
    const { authorization } = req.headers

    try {
        const decoded = jwt.verify(authorization,process.env.JWT_SECRET);
        req.user = decoded
        next()
    } catch (error) {
        throw new CustomAPIError("Invalid token",498)
    }
}

module.exports = mobileAuth;