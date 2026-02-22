const produtModel = require("../Models/Product");

const jwt = require('jsonwebtoken');

async function getProducts(req, res){
    let products = await produtModel.find({}).sort({price: req.params.para});

    res.render("Partials/user/_ProductView1", { layout: false , products});
}

module.exports = {
    getProducts
}