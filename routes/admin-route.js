const express = require('express');
const router = express.Router();


//controllers
const {
    addIngredient
} = require('../controllers/Admins');

//middleware

const adminAutorization = require('../middleware/admin-authorization-middleware');

router.route('/add-ingredient').post(adminAutorization,addIngredient)

module.exports = router