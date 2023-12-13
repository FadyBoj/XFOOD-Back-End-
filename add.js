const Category = require('./models/Category');
const connectDB = require('./db/connect');
require('dotenv').config()
categoriesList = ["burger",
    "chicken",
    "appetizers",
    "sauces",
    "kids-meals",
    "desserts",
    "drinks"
]




const add = async() =>{
    await connectDB(process.env.MONGO_URI)

    await Promise.all(
        categoriesList.map(async(item) =>{
            await Category.create({
                title:item
            })
        })
    )

    console.log("Added !")
}

add()