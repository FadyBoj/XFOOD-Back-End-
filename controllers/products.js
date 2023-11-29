const Product = require('../models/Product');
const CustomAPIError= require('../error/CustomAPIError');

const getProducts = async(req,res) =>{

    try {
        const products = await Product.find({});
        res.status(200).json(products)
        
    } catch (error) {
        throw new CustomAPIError("Can't get the products",500);
    }
}

module.exports = {
    getProducts,
}