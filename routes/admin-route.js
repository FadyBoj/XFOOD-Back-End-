const express = require('express');
const router = express.Router();


//controllers
const {
    adminTest
} = require('../controllers/Admins');

//middleware

const adminAutorization = require('../middleware/admin-authorization-middleware');

router.route('/test').get(adminAutorization,adminTest)

module.exports = router