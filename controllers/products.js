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

const singleProduct = async(req,res) =>{
    const { id } = req.params;
    console.log(id)

    try {
        const product = await Product.find({_id:id});
        if(product.length === 0)
        return res.status(404).json({msg:"Not found"})
    
        res.status(200).json(product[0])
    } catch (error) {
        throw new CustomAPIError("Something went wrong",500);
    }
}

const getIngredients = async(req,res) =>{
    
    try {
        const ingredients = await Ingredient.find({});
        
        res.status(200).json(ingredients)

    } catch (error) {
        throw new CustomAPIError("Something went wrong",500)
    }
}

module.exports = {
    getProducts,
    singleProduct,
    getIngredients
}