const express = require('express');
const router = express.Router();

const {

    getProducts,
    singleProduct,
    getIngredients

} = require('../controllers/products');

router.route('/').get(getProducts);
router.route('/single/:id').get(singleProduct);
router.route('/ingredients').get(getIngredients);


module.exports = router;