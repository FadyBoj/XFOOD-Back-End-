const mongoose = require('mongoose');

const connectDB = async(URL) =>{
   await mongoose.connect(URL);
   console.log("Successfully connected to mongoDB")
}

module.exports = connectDB;