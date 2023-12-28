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
        unique:true,
        required:true,
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
        required:false
    },
    cartItems:{
        type:Array,
        required:false
    },
    previousOrders:{
        type:Array,
        required:false
    },
    phoneNumber:{
        type:String,
        required:false
    },

    wishList:{
        type:Array,
        required:false
    },
    admin:{
      type:Boolean,
      required:true,
      default:false  
    },
    role:{
        type:String,
        required:true,
        default:'user'
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