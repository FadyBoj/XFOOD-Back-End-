const express = require('express');
const router = express.Router();

const mobileAuthMiddleware = require('../middleware/mobile-auth');
const requiredAuth = require('../middleware/required-auth');
const isAuth = require('../middleware/isAuth');

const {
    createAccount,
    login,
    checkAuth,
    logout,
    mobileLogin,
    verify,
    addToCart,
    cartItems,
    clearCart,
    makeOrder,
    removeFromCart,
    payment,
    previousOrders,
    inscreaseProductQty,
    decreaseProductQty,
    renewOrder,
    updateUserInformation,
    updatePassword

} = require('../controllers/users');

const {
    getBotRespond,
} = require('../controllers/AI');

router.route('/register').post(createAccount);
router.route('/login').post(login);
router.route('/mobile-login').post(mobileLogin)
router.route('/check-auth').get(checkAuth);
router.route('/logout').post(logout)
router.route('/verify').post(requiredAuth,verify);
router.route('/send-msg').post(getBotRespond);
router.route('/add-to-cart').post(isAuth,addToCart)
router.route('/cart-items').get(isAuth,cartItems)
router.route('/clear-cart').get(isAuth,clearCart)
router.route('/make-order').post(requiredAuth,makeOrder);
router.route('/renew-order').post(requiredAuth,renewOrder)
router.route('/remove-from-cart').post(isAuth,removeFromCart)
router.route('/payment').get(requiredAuth,payment)
router.route('/previous-orders').get(requiredAuth,previousOrders);
router.route('/increase-product-qty').post(isAuth,inscreaseProductQty);
router.route('/decrease-product-qty').post(isAuth,decreaseProductQty);
router.route('/update-user-information').patch(requiredAuth,updateUserInformation);
router.route('/update-password').patch(requiredAuth,updatePassword);


 

module.exports = router