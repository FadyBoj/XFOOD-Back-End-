const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    customer_name:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    userID:{
        type:String,
        required:true
    },
    deliveryID:{
        type:String,
        required:false
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
    status:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:false,
        default:null
    }


})

module.exports = mongoose.model('Order',Order);