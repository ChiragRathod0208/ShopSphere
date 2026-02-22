const express = require('express');

const router = express.Router();
const cartController = require('../Controllers/cartController');
const { isLoggedIn } = require('../MiddleWares/authMiddelware');

router.get('/viewCart', isLoggedIn, cartController.getCart);
router.post('/addToCart', isLoggedIn,cartController.addToCart);
router.post('/updateQty', isLoggedIn, cartController.updateQuantity);

module.exports = router;