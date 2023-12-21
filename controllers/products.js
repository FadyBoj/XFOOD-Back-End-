const Product = require('../models/Product');
const Ingredient = require('../models/Ingredient');
const CustomAPIError= require('../error/CustomAPIError');

const getProducts = async(req,res) =>{
    const { category } = req.query
    const queryObject = {}
    let prices = {}
    if(category)
    queryObject.category = category;

    try {
        const ingredients = await Ingredient.find({});
        ingredients.forEach((item) =>{
            prices = {...prices,[item.title]:item.price}
        })

        const products = await Product.find(queryObject);

        const formattedProducts =  products.map((item) =>{
            return {...item._doc,price_per_unit:item.category === 'chicken' ? prices['chicken'] :
            item.category === 'burger' ? prices['meat'] : item.price_per_unit
            }
        })
        res.status(200).json(formattedProducts)
        
    } catch (error) {
        console.log(error)
        throw new CustomAPIError("Can't get the products",500);
    }
}

module.exports = {
    getProducts,
}