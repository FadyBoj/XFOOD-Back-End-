require('express-async-errors');
const express = require('express');
const app = express();
const path = require('path')
const cookieParser = require('cookie-parser');
const connectDB = require('./db/connect');
require('dotenv').config();

//middleware
const errorHandlerMiddleware = require('./middleware/error-handler-middleware');

app.use(express.json());
app.use(cookieParser());
app.use(express.static('./dist'))

//routes
const usersRoute = require('./routes/users-route');

app.use('/',usersRoute)

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

app.get('/',(req,res) =>{
    res.sendFile(path.resolve('./view/index.html'))
})


//Preventing Scale Down

app.get('/self-ping',(req,res) =>{
    res.status(200).json({msg:"Successfully pinged"})
})

setInterval(async() =>{

    try {
        const response = await fetch('https://xfood.onrender.com//self-ping');
        const data = await response.json();
        console.log("Scaled")
        
    } catch (error) {
        console.log("Error while self pinging")
    }


},1000 )

const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,() =>{
            console.log(`Server is Running at port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}


start()