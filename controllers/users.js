const User = require('../models/User');
const CustomAPIError = require('../error/CustomAPIError');
const jwt = require('jsonwebtoken');
require('dotenv').config()
//Create Account

const createAccount = async(req,res) =>{
    const {firstname, lastname, email, password, age} = req.body;
    console.log(req.body)

    if(!firstname || !lastname || !email || !password || !age)
    throw new CustomAPIError('Please fill in your information',400);

    try {
        const isExist = await User.find({email:email.toLowerCase()});
        if(isExist.length > 0)
        throw new CustomAPIError('This email is registered before, please try to login to your account',400);
    } catch (error) {
        throw new CustomAPIError('This email is registered before, please try to login to your account',400);
    }

    try {
        await User.create({
            firstname:firstname,
            lastname:lastname,
            email:email.toLowerCase(),
            password:password,
            age:age
        })
        console.log("Successfully created a new account");
        res.status(200).json({msg:"successfully created your account"})
    } catch (error) {
        console.log(error)
    }
}

// Login

const login = async(req,res) =>{

    const { email, password } = req.body

    if(!email || !password)
    {
        throw new CustomAPIError("Please provide email and password",400)
    }

        const user = await User.find({email:email.toLowerCase()});
        if(user.length > 0 && user[0].password === password)
        {
            const data = {
                id:user[0]._id,
                firstname:user[0].firstname,
                lastname:user[0].lastname,
                email:user[0].email,
                address:user[0].address,
                cartItems:user[0].cartItems,
                previousOrders:user[0].previousOrders,
                wishList:user[0].wishList
            }

            const oneDay = 1000 * 60 * 60 * 24;
            const token = jwt.sign(data,process.env.JWT_SECRET,{expiresIn:'1d'});
            res.cookie('jwtToken',token,{httpOnly:true,secre:true,maxAge:oneDay})
            res.status(200).json({msg:"Successfully logged in !"})
        }
        else{
            throw new CustomAPIError("Username and password are not matched ",400)
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
    checkAuth,
    logout
}