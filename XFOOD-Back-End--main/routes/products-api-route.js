const express = require('express');
const router = express.Router();

const {

    getProducts,
    singleProduct

} = require('../controllers/products');

router.route('/').get(getProducts);
router.route('/single/:id').get(singleProduct);


module.exports = router;