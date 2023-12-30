const Product = require('../models/Product');
const Ingredient = require('../models/Ingredient');
const Offer = require('../models/offer');
const Order = require('../models/Order');
const CustomAPIError = require('../error/CustomAPIError');
const { readFileSync,writeFileSync, unlinkSync, readdirSync} = require('fs');
const path = require('path');
const rootDirectory = path.dirname(require.main.filename);
const  cloudinary = require('cloudinary');
const User = require('../models/User');
const bcrypt = require('bcrypt');
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


//Increase ingredient qty

const increaseIngredientQty = async(req,res) =>{
    const user = req.user;
    const userRole = user.role.toLowerCase();
    const systemRoles = ['employee','manager']; 

    if(!systemRoles.includes(userRole))
    throw new CustomAPIError("Forbidden",403);

    
    const { title, newQty} = req.body;
    if(!title || !newQty)
    throw new CustomAPIError("ingredient title and qty must be provided",400);

    try {
        const updatedIngredient = await Ingredient.findOneAndUpdate({title:title.toLowerCase()},
        {$inc:{quantity:newQty}},
        {new:true});

        if(!updatedIngredient)
        return res.status(400).json({msg:"Ingredient not found"});

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
            ingredients: ingredients ? JSON.parse(ingredients) : [],
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
    try {
    const { id, title, description, price, category, ingredients } = req.body; 
    const files = req.files;
    let imagesUrl = [];
    let queryObject = {};

    const product = await Product.find({_id:id});

    //Removing old images

    if(files && files.length > 0)
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
        const up = await Product.findOneAndUpdate({_id:id},queryObject);
        console.log(up)
        res.status(200).json({msg:up ?"Successfully updated the product": "Nothing has been updated"})
    } catch (error) {
        console.log(error)
        throw new CustomAPIError("Something went wrong while updating the product",500);
    }
    } catch (error) {
        console.log(error)
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


const viewOrders = async(req,res) =>{

    const user = req.user;
    const userRole = user.role.toLowerCase();
    const systemRoles = ['employee','manager']; 

    if(!systemRoles.includes(userRole))
    throw new CustomAPIError("Forbidden",403)


    try {
        const orders = await Order.find({});
        res.status(200).json(orders);
    } catch (error) {
        throw new CustomAPIError("Something went wrong",500)
    }

}

const deliveryOrders = async(req,res) =>{

    const user = req.user;
    const userRole = user.role.toLowerCase();
    const systemRoles = ['employee','manager','delivery']; 

    if(!systemRoles.includes(userRole))
    throw new CustomAPIError("Forbidden",403)

    try {
        const orders = await Order.find({status:'out to delivery'});
        res.status(200).json(orders);
    } catch (error) {
        throw new CustomAPIError("Something went wrong",500)
    }
}

const change_order_status = async(req,res) =>{
    const { orderId, orderStatus } = req.body;
    const user = req.user;
    const userRole = user.role.toLowerCase();
    const systemRoles = ['employee','manager']; 
    const validStatus = ['preparing','cancelled','out to delivery','delivered']

    if(!systemRoles.includes(userRole))
    throw new CustomAPIError("Forbidden",403);

    if(!orderId || !orderStatus)
    throw new CustomAPIError("Order id and status must be provided",400);

    if(!validStatus.includes(orderStatus.toLowerCase()))
    throw new CustomAPIError("Please provide a valid status",400);

    try {

        const updatedOrder = await Order.findByIdAndUpdate({_id:orderId},{status:orderStatus.toLowerCase()});
        res.status(200).json({msg:`Successfully changed order ${updatedOrder.id} to ${orderStatus.toLowerCase()}`});
        
    } catch (error) {
        throw new CustomAPIError("Order not found",400)
    }
}

const addEmployee = async(req,res) =>{
    const { First_name, Last_name, Role, Email_address, Password } = req.body;
    const user = req.user;
    const userRole = user.role.toLowerCase();
    const systemRoles = ['employee','delivery'];
    const forbiddenRoles = ['manager']; 

    if(userRole !== 'manager')
    throw new CustomAPIError("Forbidden",403);

    if (!First_name || !Last_name || !Role || !Email_address || !Password)
    throw new CustomAPIError("Please provide all employee information",400);

    if(!systemRoles.includes(Role.toLowerCase()))
    throw new CustomAPIError("Please provide a valid role",400);

    if(forbiddenRoles.includes(Role.toLowerCase()))
    throw new CustomAPIError("You can't assign the role to be manager",400);


    try {

        const checkUser = await User.find({email:Email_address.toLowerCase()});
        if (checkUser.length > 0)
        return res.status(400).json({msg:"This email is taken"})

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(Password,salt);

        await User.create({
            firstname:First_name,
            lastname:Last_name,
            email:Email_address.toLowerCase(),
            password:hash,
            admin:true,
            role:Role.toLowerCase(),

        })
        res.status(200).json({msg:"Successfully created employee account"})
    } catch (error) {
        console.log(error)
        throw new CustomAPIError("Something went wrong",500)
    }
}

const getIngredientsTitles = async(req,res) =>{
    
    try {
        let ingredients = await Ingredient.find({});
        ingredients = ingredients.map((item) =>{
            return item.title
        })

        res.status(200).json(ingredients)

    } catch (error) {
        throw new CustomAPIError("Something went wrong",500)
    }
}

const getUsersInformation = async(req,res) =>{
    try {
        const users = await  User.find({});
        console.log(users)
        const ids = users.map((user) =>{
            return user.id
        })

        res.status(200).json({users:ids})

    } catch (error) {
        console.log(error)
        throw new CustomAPIError("Something went wrong",500)
    }
}

module.exports = {
    addIngredient,
    deleteIngredient,
    editIngredient,
    addProduct,
    updateProduct,
    deleteProduct,
    addOffer,
    viewOrders,
    change_order_status,
    deliveryOrders,
    addEmployee,
    getIngredientsTitles,
    increaseIngredientQty,
    getUsersInformation
}