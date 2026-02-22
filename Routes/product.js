const express = require('express');
const router = express.Router();
const productController = require("../Controllers/productController");

router.get("/:para", productController.getProducts);

module.exports = router;