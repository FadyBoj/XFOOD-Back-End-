const User = require('../models/User');
const CustomAPIError = require('../error/CustomAPIError');

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


module.exports = {
    createAccount
}