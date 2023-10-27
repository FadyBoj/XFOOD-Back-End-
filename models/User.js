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
    }
})

module.exports = mongoose.model('User',User);