require('express-async-errors');
const express = require('express');
const app = express();
const path = require('path')
const cookieParser = require('cookie-parser');
const connectDB = require('./db/connect');
const axios = require('axios');
const cors = require('cors')
require('dotenv').config();

//middleware
const errorHandlerMiddleware = require('./middleware/error-handler-middleware');

app.use(cors());
app.use(express.urlencoded({
    extended:false
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('./dist'))

//routes
const usersRoute = require('./routes/users-route');
const adminsRoute = require('./routes/admin-route');

app.use('/',usersRoute)
app.use('/admin',adminsRoute)

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
        const { data } = await axios.get('https://xfood.onrender.com/self-ping');
        
    } catch (error) {
        console.log(error)
    }


},1000 * 60 )

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