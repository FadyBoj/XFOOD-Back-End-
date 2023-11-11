const mongoose = require('mongoose');

const User = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true 
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:Array,
        required:false
    },
    age:{
        type:Number,
        required:true
    },
    cartItems:{
        type:Array,
        required:false
    },
    previousOrders:{
        type:Array,
        required:false
    },
    wishList:{
        type:Array,
        required:false
    },
    verified:{
        type:Boolean,
        required:true,
        default:false
    },
    verificationCode:{
        code:{
            type:Number,
            required:true,
            default: Math.floor(Math.random() * 9999999)
        },
        createdAt:{
            type:Date,
            required:true,
            default:Date.now()
        }
    }
})

module.exports = mongoose.model('User',User);