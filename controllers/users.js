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


            await sendMail(email.toLowerCase(),createdUser.verificationCode.code);
            
            const data = {
                id:createdUser._id,
                email:createdUser.email,
                firstname:createdUser.firstname,
                lastname:createdUser.lastname,
               }

             const oneDay = 1000 * 60 * 60 * 24;
             const token = jwt.sign(data,process.env.JWT_SECRET,{expiresIn:'1d'});
             res.cookie('jwtToken',token,{httpOnly:true,secure:true,maxAge:oneDay});
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
               }

               const oneDay = 1000 * 60 * 60 * 24;
               const token = jwt.sign(data,process.env.JWT_SECRET,{expiresIn:'1d'});
                res.cookie('jwtToken',token,{httpOnly:false,secure:true,maxAge:oneDay});
               res.status(200).json({msg:"Successfully logged in"});

            })
        }


}

// check Auth

const checkAuth = async(req,res) =>{
    const token = req.cookies.jwtToken;
    console.log(req.cookies)
    
    if(!token)
    throw new CustomAPIError("Not authorized",401);

    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.find({email:"fadynabil701@gmail.com"});

        //payload
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

         res.status(200).json({user:data});
    } catch (error) {
        console.log(error)
        throw new CustomAPIError("Invalid Token",498);
    }
}

//Verify

const verify = async (req,res) =>{


    if(req.user.verified)
    throw new CustomAPIError("Forbidden",403)
    
    const { code } = req.body;
    const { verificationCode, id } = req.user;
    const userCode = verificationCode.code;

    if(code !== userCode)
    throw new CustomAPIError("Invalid verification code",400);

    try {
        await User.findOneAndUpdate({_id:id},{verified:true});

        res.clearCookie('jwtToken');

        res.status(200).json({msg:"Successfully verified your account"});
        
    } catch (error) {
        throw new CustomAPIError("Something went wrong",500)
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
    const { firstname } = req.user;
    res.status(200).json({msg:`Hello ${firstname} `})
}


module.exports = {
    createAccount,
    login,
    checkAuth,
    logout,
    mobileAuthTest,
    verify
}