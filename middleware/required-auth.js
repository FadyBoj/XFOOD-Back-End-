const jwt = require('jsonwebtoken');
require('dotenv').config();
const CustomAPIError = require('../error/CustomAPIError');
const User = require('../models/User');

const requiredAuth = async(req,res,next) =>{
    
    const token = req.cookies.jwtToken || req.headers.authorization;

    if(!token)
    throw new CustomAPIError("No token provided",401);


    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.find({_id:decoded.id});

        const data = {
            id:user[0].id,
            email:user[0].email,
            password:user[0].password,
            firstname:user[0].firstname,
            lastname:user[0].lastname,
            address:user[0].address,
            cartItems:user[0].cartItems,
            previousOrders:user[ 0].previousOrders,
            wishList:user[0].wishList,
            verified:user[0].verified,
            verificationCode:user[0].verificationCode,
            role:user[0].role,
            admin:user[0].admin
           }

        req.user = data;
        next();
    } catch (error) {
        throw new CustomAPIError("Invalid token",498);
    }

}

module.exports = requiredAuth