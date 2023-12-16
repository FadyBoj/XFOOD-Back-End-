const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'./uploads/'})

//controllers
const {
    addIngredient,
    deleteIngredient,
    editIngredient,
    addProduct,
    updateProduct,
    deleteProduct,
    addOffer
} = require('../controllers/Admins');   

//middleware

const adminAutorization = require('../middleware/admin-authorization-middleware');

//Ingredients routes
router.route('/add-ingredient').post(adminAutorization,addIngredient);
router.route('/delete-ingredient').delete(adminAutorization,deleteIngredient);
router.route('/edit-ingredient').patch(adminAutorization,editIngredient);
router.route('/add-product').post(adminAutorization,upload.array('images'),addProduct);
router.route('/update-product').patch(adminAutorization,upload.array('images'),updateProduct);
router.route('/delete-product').delete(adminAutorization,deleteProduct);
router.route('/add-offer').post(adminAutorization,upload.single('images'),addOffer);


//Products route



module.exports = router