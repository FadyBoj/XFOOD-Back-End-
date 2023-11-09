const User = require('../models/User');
const CustomAPIError = require('../error/CustomAPIError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendMail = require('./sendMail');
require('dotenv').config();
//Create Account

const createAccount = async(req,res) =>{
    const {firstname, lastname, email, password, age} = req.body;

    if(!firstname || !lastname || !email || !password || !age)
    throw new CustomAPIError('Please fill in your information',400);

    try {
        const isExist = await User.find({email:email.toLowerCase()});
        if(isExist.length > 0)
        throw new CustomAPIError('This email is registered before, please try to login to your account',400);
    } catch (error) {
        throw new CustomAPIError('This email is registered before, please try to login to your account',400);
    }

    bcrypt.hash(password,10,async(err,hash) =>{

        try {
            const createdUser = await User.create({
                firstname:firstname,
                lastname:lastname,
                email:email.toLowerCase(),
                password:hash,
                age:age
            })

            await sendMail(email.toLowerCase(),createdUser.verificationCode.code)
            
            res.status(200).json({msg:"successfully created your account"})
        } catch (error) {
            console.log(error)
        }

    })


    
}

// Login

const login = async(req,res) =>{

    const { email, password } = req.body

    if(!email || !password)
    {
        throw new CustomAPIError("Please provide email and password",400)
    }

        const user = await User.find({email:email.toLowerCase()});

        if(user.length === 0)
        {
            throw new CustomAPIError("This account is not registered yet, please try to create a new account",404)
        }
        else{
            bcrypt.compare(password,user[0].password,(err,result) =>{
               if(!result)
               return res.status(401).json({msg:"Email and password are not matched"});

               const data = {
                id:user[0]._id,
                email:user[0].email,
                firstname:user[0].firstname,
                lastname:user[0].lastname,
                address:user[0].address,
                cartItems:user[0].cartItems,
                previousOrders:user[0].previousOrders,
                wishList:user[0].wishList
               }

               const oneDay = 1000 * 60 * 60 * 24;
               const token = jwt.sign(data,process.env.JWT_SECRET,{expiresIn:'1d'});
               res.cookie('jwtToken',token,{httpOnly:true,secure:true,maxAge:oneDay});
               res.status(200).json({msg:"Successfully logged in"});

            })
        }


}

// check Auth

const checkAuth = async(req,res) =>{
    const token = req.cookies.jwtToken;

    if(!token)
    throw new CustomAPIError("Not authorized",401);

    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        res.status(200).json({user:decodedToken});
    } catch (error) {
        console.log("Error !")
        throw new CustomAPIError("Invalid Token",498);
    }
}

//Logout

const logout = async(req,res) =>{
    const token = req.cookies.jwtToken;

    if(!token)
    throw new CustomAPIError("No token provided",404);

    res.clearCookie('jwtToken');
    res.status(200).json({msg:'Logged out'});
}


const mobileAuthTest = (req,res) =>{
    const { name } = req.user;
    res.status(200).json({msg:`Hello ${name} `})
}


module.exports = {
    createAccount,
    login,
    checkAuth,
    logout,
    mobileAuthTest
}