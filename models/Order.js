const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    },
    userID:{
        type:String,
        required:true
    },
    total_price:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    payment_type:{
        type:String,
        required:true
    },

})

module.exports = mongoose.model('Order',Order);