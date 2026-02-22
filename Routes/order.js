const express = require('express');
const orderController = require('../Controllers/orderController');
const { isLoggedIn, isAdmin } = require('../MiddleWares/authMiddelware');

const Router = express.Router();

Router.get('/view', isLoggedIn, orderController.viewOrders);
Router.get('/getAll', isLoggedIn, isAdmin, orderController.GetallOrders);
Router.post('/', isLoggedIn, orderController.placeOrder);

module.exports = Router;