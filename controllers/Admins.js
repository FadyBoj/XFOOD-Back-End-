const Product = require('../models/Product');
const Ingredient = require('../models/Ingredient');
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

//Add product

const addProduct = async(req,res) =>{

    const { title, description, price, category, ingredients } = req.body;
    const files = req.files

    if(!title || !description || !price || !category || !ingredients || files.length === 0)
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
            category:category,
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
    const { title, description, price, category, ingredients } = req.body; 
    const files = req.files;
    let imagesUrl = [];
    let queryObject = {};
    const id = '65608f5a2cabcf61b3546f3b';

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

module.exports = {
    addIngredient,
    deleteIngredient,
    editIngredient,
    addProduct,
    updateProduct
}