const Category = require('./models/Category');
const connectDB = require('./db/connect');
const Product = require('./models/Product');
require('dotenv').config()


const updateData = async() =>{

    try {
        await connectDB(process.env.MONGO_URI);
        const products = await Product.find({});
        const ids = products.map((item) =>{
            return item.id
        })

        console.log(ids)

        

            for(let i =0 ; i < ids.length; i++){
                await Product.findByIdAndUpdate({_id:ids[i]},{ingredients:['tomatos','onions','bread']})
            }

            console.log("Success")
    } catch (error) {
        console.log(error   )
    }        

}

updateData()