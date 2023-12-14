const express = require('express');
const router = express.Router();

const mobileAuthMiddleware = require('../middleware/mobile-auth');
const requiredAuth = require('../middleware/required-auth');

const {
    createAccount,
    login,
    checkAuth,
    logout,
    mobileLogin,
    mobileResetPassword,
    verify,
    addToCart
} = require('../controllers/users');

const {
    getBotRespond,
} = require('../controllers/AI');

router.route('/register').post(createAccount);
router.route('/login').post(login);
router.route('/mobile-login').post(mobileLogin)
router.route('/mobile-reset-password').post(mobileAuthMiddleware,mobileResetPassword)
router.route('/check-auth').get(checkAuth);
router.route('/logout').get(logout)
router.route('/verify').post(requiredAuth,verify);
router.route('/send-msg').post(getBotRespond);
router.route('/add-to-cart').post(addToCart)




module.exports = router