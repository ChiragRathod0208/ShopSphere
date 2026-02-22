const express = require('express');
const router = express.Router();
const adminController = require("../Controllers/adminController");
const productController = require("../Controllers/productController");
const { isAdmin } = require('../MiddleWares/authMiddelware');
const upload = require('../MiddleWares/uploadMiddelware');

router.get("/products", isAdmin, adminController.productList);
router.get("/addProduct", adminController.GetAddProductView);
router.post("/addProduct", upload.single('image'),adminController.AddProduct);
router.post("/getEditProductView", adminController.GetEditProductView);
router.post("/editProduct", upload.single('image'), adminController.EditProduct);
router.post("/deleteProduct", adminController.DeleteProduct);

module.exports = router;