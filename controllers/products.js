const Product = require('../models/Product');
const CustomAPIError= require('../error/CustomAPIError');

const getProducts = async(req,res) =>{
    const { category } = req.query
    const queryObject = {}
    
    if(category)
    queryObject.category = category;

    try {
        const products = await Product.find(queryObject);
        res.status(200).json(products)
        
    } catch (error) {
        throw new CustomAPIError("Can't get the products",500);
    }
}

module.exports = {
    getProducts,
}