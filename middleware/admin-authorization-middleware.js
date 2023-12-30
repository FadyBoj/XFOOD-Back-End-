const jwt = require('jsonwebtoken');
const CustomAPIError = require('../error/CustomAPIError');
const user = require('../models/User');
const User = require('../models/User');

const adminAuthorization = async (req,res,next) =>{

    const token = req.cookies.jwtToken || req.headers.authorization;

        if(!token)
        throw new CustomAPIError("No token provided",401);

        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            const user = await User.find({_id:decoded.id});

            if(user.length === 0)
            return res.status(500).json({msg:"Something went wrong"})

            const data = {
                id:user[0]._id,
                email:user[0].email,
                firstname:user[0].firstname,
                lastname:user[0].lastname,
                address:user[0].address,
                cartItems:user[0].cartItems,
                previousOrders:user[0].previousOrders,
                wishList:user[0].wishList,
                verified:user[0].verified,
                verificationCode:user[0].verificationCode,
                role:user[0].role,
                admin:user[0].admin
               }
               
               const admin = user[0].admin
               
             if(!admin)
            throw new CustomAPIError("Not authorized",401);

            req.user = data
            next();

        } catch (error) {
            console.log(error)
            throw new CustomAPIError("Not authorized",498)

        }

}

module.exports = adminAuthorization