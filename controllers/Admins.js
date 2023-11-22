const Product = require('../models/Product');
const Ingredient = require('../models/Ingredient');
const CustomAPIError = require('../error/CustomAPIError');

// Add ingredient

const addIngredient = async(req,res) =>{
    const { title, quantity } = req.body;

    if(!title || !quantity)
    return res.status(400).json({msg:"Missing information"});

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

const deleteIngredient = async(req,res) =>{
   const { title } = req.body;
   if(!title)
   return res.status(400).json({msg:"Ingredient title is missing"});

   try {
    await Ingredient.findOneAndDelete({title:title});
    res.status(200).json({msg:"Successfully deleted ingredient"})
   } catch (error) {
    throw new CustomAPIError("Something went wrong",400);
   }

}

const editIngredient = async(req,res) =>{
    const { title, newTitle, quantity } = req.body;

    if(!title || !quantity || !newTitle)
    return res.status(400).json({msg:"Missing information"});

    try {

       const updatedIngredient =  await Ingredient.findOneAndUpdate({title:title},{title:newTitle,quantity:quantity});
       if(!updatedIngredient)
       return res.status(400).json({msg:"Ingredient doesn't exist"});

       res.status(200).json({msg:"Successfully updated ingredient"})
    } catch (error) {
        throw new CustomAPIError("Something went wrong",400);
    }
}

module.exports = {
    addIngredient,
    deleteIngredient,
    editIngredient
}