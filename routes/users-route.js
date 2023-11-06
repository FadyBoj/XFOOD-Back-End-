const express = require('express');
const router = express.Router();

const mobileAuthMiddleware = require('../middleware/mobile-auth')

const {
    createAccount,
    login,
    checkAuth,
    logout,
    mobileAuthTest
} = require('../controllers/users');

router.route('/register').post(createAccount);
router.route('/login').post(login);
router.route('/check-auth').get(checkAuth);
router.route('/logout').get(logout)
router.route('/test').get(mobileAuthMiddleware,mobileAuthTest)



module.exports = router