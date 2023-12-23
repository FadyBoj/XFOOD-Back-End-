const mongoose = require('mongoose');

const Ingredient = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    },
    unit:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    }
});

module.exports = mongoose.model('Ingredient',Ingredient)