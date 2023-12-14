const mongoose = require('mongoose');
const User = require('../models/User');
const CustomAPIError = require('../error/CustomAPIError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendMail = require('./sendMail');
const Product = require('../models/Product')
require('dotenv').config();
//Create Account

const createAccount = async(req,res) =>{
    const {firstname, lastname, email, password, age, phoneNumber, address} = req.body;

    if(!firstname || !lastname || !email || !password || !age || !phoneNumber)
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
                address:address || [],
                phoneNumber:phoneNumber,
                age:Number(age),
                verificationCode:{
                    code:Math.floor(Math.random() * 9999999),
                    createdAt:Date(Date.now())
                }

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
             res.cookie('jwtToken',token,{secure:true,sameSite:'None',maxAge:oneDay});
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
            throw new CustomAPIError("This account is not registered yet, please try to create a new account",400)
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
                res.cookie('jwtToken',token,{secure:true,sameSite:'None',maxAge:oneDay});
               res.status(200).json({msg:"Successfully logged in"});

            })
        }


}

//Mobile login

const mobileLogin = async(req,res) =>{

    const { email, password } = req.body

    if(!email || !password)
    {
        throw new CustomAPIError("Please provide email and password",400)
    }

        const user = await User.find({email:email.toLowerCase()});

        if(user.length === 0)
        {
            throw new CustomAPIError("This account is not registered yet, please try to create a new account",400)
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
               res.status(200).json({
                msg:"Successfully logged in",
                status:200,
                token:token
            });

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

        const user = await User.find({email:decodedToken.email});

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

    if(Number(code) !== Number(userCode))
    throw new CustomAPIError("Invalid verification code",400);

    try {
        await User.findOneAndUpdate({_id:id},{verified:true});

        res.clearCookie('jwtToken');

        res.status(200).json({msg:"Successfully verified your account"});
        
    } catch (error) {
        throw new CustomAPIError("Something went wrong",500)
    }

    
}


//Mobile reset password 
const mobileResetPassword = async(req,res) =>{
    const {oldPassword, newPassword} = req.body;
    const user = req.user

 
    if(!oldPassword || !newPassword)
    throw new CustomAPIError("Old password and new password must be provided",400);

    try {
        const existedUser = await User.find({_id:user.id.toHexString()});
        const userPassword = existedUser[0].password;

        bcrypt.compare(oldPassword,userPassword,(err,result) =>{
            if(!result)
            return res.status(400).json({msg:"Wrong password"})
        })


    } catch (error) {
        console.log(error)
    }
}


const addToCart = async(req,res) =>{
    const {productId, productQuantity, size, extras} = req.body;
    console.log(req.body)
    if(!productId || !productQuantity || !size)
    return res.status(400).json({msg:"Product info must be provided"})

    try {
        const product = await Product.find({_id:productId});
        if(product.length === 0)
        return res.status(404).json({msg:"Product is not found "});

        const previousCart = req.cookies.cart;
        let newCart = []
        const fiveDays = 1000 * 60 * 60 * 24 * 5;


        if(!previousCart){
        newCart = [{
            id:product[0].id,
            qty:productQuantity,
            price:product[0].price,
            size:size,
            extras:extras || []
        }]
        res.cookie('cart',newCart,{secure:true,sameSite:'None',maxAge:fiveDays});
        return res.status(200).json({msg:"Successfully added product to cart"})
        }

        previousCart.forEach((item) =>{
           if(item.id === product[0].id)
           return res.status(400).json({msg:"Product already exist"})
        })

        newCart = [previousCart,{
            id:product[0].id,
            qty:productQuantity,
            price:product[0].price,
            size:size,
            extras:extras || []
        }].flat()
        
        res.cookie('cart',newCart,{secure:true,sameSite:'None',maxAge:fiveDays});
        return res.status(200).json({msg:"Successfully added product to cart",items:newCart})
        

    } catch (error) {
        throw new CustomAPIError("Product not found",404)
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

 

module.exports = {
    createAccount,
    login,
    mobileLogin,
    mobileResetPassword,
    checkAuth,
    logout,
    verify,
    addToCart
}