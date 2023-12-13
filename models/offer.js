const mongoose = require('mongoose');

const Offer = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    products:{
        type:Array,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('offer',Offer)