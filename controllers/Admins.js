const Product = require('../models/Product');
const Ingredient = require('../models/Ingredient');
const Offer = require('../models/offer');
const CustomAPIError = require('../error/CustomAPIError');
const { readFileSync,writeFileSync, unlinkSync, readdirSync} = require('fs');
const path = require('path');
const rootDirectory = path.dirname(require.main.filename);
const  cloudinary = require('cloudinary');
require('dotenv').config();

//Cloudinary config 

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET 
  });

// Add ingredient

const addIngredient = async(req,res) =>{
    const { title, quantity, price, unit } = req.body;
    console.log(req.body)

    if(!title || !quantity || !price || !unit)
    return res.status(400).json({msg:"Missing information"});

    try {
        await Ingredient.create({
            title:title.toLowerCase(),
            quantity:Number(quantity),
            price:Number(price),
            unit:unit.toLowerCase()
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

//Add product

const addProduct = async(req,res) =>{

    const { title, description, price, category, ingredients, unit, price_per_unit } = req.body;
    const files = req.files


    if(!title || !description || !price || !category  || files.length === 0 || !unit || !price_per_unit)
    throw new CustomAPIError("Please fill all product information",400);

    let imagesUrl = [];

    await Promise.all(

        files.map(async(item) =>{

            try {
                const imageData = readFileSync(path.join(rootDirectory,'uploads',item.filename));
                writeFileSync(path.join(rootDirectory,'uploads',item.originalname),imageData);
                await cloudinary.v2.uploader.upload(path.join(rootDirectory,'uploads',item.originalname),
                { public_id: item.originalname }, 
                (error, result) =>{
                    imagesUrl.push({public_id:item.originalname,url:result.url});
                });
    
                unlinkSync(path.join(rootDirectory,'uploads',item.originalname));
                unlinkSync(path.join(rootDirectory,'uploads',item.filename));
            } catch (error) {
               throw new CustomAPIError("Something went wrong while uploading the images, please try again",500)
            }

           

        })
    )

    const uploadFiles = readdirSync(path.join(rootDirectory,'uploads'));
    if(uploadFiles)
    {
        uploadFiles.forEach((item) =>{
            unlinkSync(path.join(rootDirectory,'uploads',item))
        })
    }

    try {
        await Product.create({
            title:title,
            description:description,
            price:price,
            ingredients:ingredients.split(','),
            images:imagesUrl,
            category:category.toLowerCase(),
            unit:unit.toLowerCase(),
            price_per_unit:price_per_unit,
            rating:0            
        })

        res.status(200).json({msg:"Successfully added the product"})

    } catch (error) {
        console.log(error)
        throw new CustomAPIError("Something went wrong while adding the product",500);
    }

  
}

//Update product

const updateProduct = async(req,res) =>{
    const { id, title, description, price, category, ingredients } = req.body; 
    const files = req.files;
    let imagesUrl = [];
    let queryObject = {};

    const product = await Product.find({_id:id});

    //Removing old images

    if(files.length > 0)
    {
    await Promise.all(
      
        product[0].images.map(async(item) =>{
            try {
             const imageId = item.public_id;
            await cloudinary.v2.uploader.destroy(imageId,(err,result) =>{
                if(err)
                return console.log(err)

            })
            } catch (error) {
                console.log(error)
            }
            
        })
    )


        // Adding new images


    await Promise.all(

        files.map(async(item) =>{

            try {
                const imageData = readFileSync(path.join(rootDirectory,'uploads',item.filename));
                writeFileSync(path.join(rootDirectory,'uploads',item.originalname),imageData);
                await cloudinary.v2.uploader.upload(path.join(rootDirectory,'uploads',item.originalname),
                { public_id: item.originalname }, 
                (error, result) =>{
                    imagesUrl.push({public_id:item.originalname,url:result.url});
                });
    
                unlinkSync(path.join(rootDirectory,'uploads',item.originalname));
                unlinkSync(path.join(rootDirectory,'uploads',item.filename));
            } catch (error) {
               throw new CustomAPIError("Something went wrong while uploading the images, please try again",500)
            }
        })
    )
    }
    
    //Defining query object

    if(title)
    queryObject.title = title;
    if(description)
    queryObject.description = description;
    if(price !== 'null')
    queryObject.price = price;
    if(category)
    queryObject.category = category;
    if(ingredients)
    queryObject.ingredients = ingredients.split(',');
    if(imagesUrl.length > 0)
    queryObject.images = imagesUrl;

    console.log(queryObject)

    // Updating the product
    try {
        await Product.findOneAndUpdate({_id:id},queryObject);
        res.status(200).json({msg:"Successfullt updated the product"})
    } catch (error) {
        console.log(error)
        throw new CustomAPIError("Something went wrong while updating the product",500);
    }

}

// Delete product

const deleteProduct = async(req,res) =>{
    const { id } = req.body;

    if(!id)
    throw new CustomAPIError("Product ID must be provided",400);

    const product = await Product.find({_id:id});
    if(product.length === 0)
    throw new CustomAPIError("Product doesn't exist",404);

    const images = product[0].images;

    await Promise.all(
        images.map(async(item) =>{
            try {
                const imageId = item.public_id;
            await cloudinary.v2.uploader.destroy(imageId,(err,result) =>{
                if(err)
                {
                    console.log(err);
                    throw new CustomAPIError("Error while deleting product image",500);
                }
            })
            } catch (error) {
                throw new CustomAPIError("Error while deleting the product",500)
            }
            
        })
    )

    try {
        await Product.deleteOne({_id:id});
        res.status(200).json({msg:"Successfully deleted the product"});
    } catch (error) {
        throw new CustomAPIError("Something went wrong",500);
    }
    

}

// Add offer

const addOffer = async(req,res) =>{
   const { title,  price, description } = req.body;
   const image = req.file
   const products = [
    {
        id:'656cc2e9bb32c5a4e555940e',
        title:"Chicken Burger"
    },
    {
        id:'656cc320bb32c5a4e5559411',
        title:'cheese burger'
    }
   ]

   if(!title || !price || !products || !description || !image)
   throw new CustomAPIError("Missing information",400)

    const imageData =   readFileSync(path.join(rootDirectory,'uploads',image.filename));
    writeFileSync(path.join(rootDirectory,'uploads',image.originalname),imageData);
    unlinkSync(path.join(rootDirectory,'uploads',image.filename));


}

module.exports = {
    addIngredient,
    deleteIngredient,
    editIngredient,
    addProduct,
    updateProduct,
    deleteProduct,
    addOffer
}