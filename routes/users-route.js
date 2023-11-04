const express = require('express');
const router = express.Router();

const {
    createAccount,
    login,
    checkAuth,
    logout
} = require('../controllers/users');

router.route('/register').post(createAccount);
router.route('/login').post(login);
router.route('/check-auth').get(checkAuth);
router.route('/logout').get(logout)



module.exports = router