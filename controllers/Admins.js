const Product = require('../models/Product');
const Ingredient = require('../models/Ingredient');
const CustomAPIError = require('../error/CustomAPIError');

// Add ingredient

const addIngredient = async(req,res) =>{
    const { title, quantity } = req.body;

    if(!title || !quantity)
    throw new CustomAPIError("Missing information",400);

    try {
        await Ingredient.create({
            title:title,
            quantity:quantity
        })
        res.status(200).json({msg:"Ingredient successfully added "})
    } catch (error) {
        throw new CustomAPIError("This item already exist",400);
    }

}


module.exports = {
    addIngredient
}