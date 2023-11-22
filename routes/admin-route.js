const express = require('express');
const router = express.Router();


//controllers
const {
    addIngredient,
    deleteIngredient,
    editIngredient
} = require('../controllers/Admins');

//middleware

const adminAutorization = require('../middleware/admin-authorization-middleware');

//Ingredients routes
router.route('/add-ingredient').post(adminAutorization,addIngredient);
router.route('/delete-ingredient').delete(adminAutorization,deleteIngredient)
router.route('/edit-ingredient').patch(adminAutorization,editIngredient)

//Products route



module.exports = router