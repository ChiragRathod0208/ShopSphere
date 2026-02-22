const express = require('express');
const router = express.Router();
const productController = require("../Controllers/productController");

router.get("/", (req, res) => {
    const referringUrl = req.get('Referrer');
    // console.log('Referring URL:', referringUrl);
    let user;
    if(req.session.user === undefined)
    {
        user = {
            name: "guest",
            role: "user"
        }
    } else {
        user = req.session.user;
    }
    res.render("layout", {
            layout: "layout",
            user: user
        }
    );
});

router.get("/products", productController.getProducts);

module.exports = router;