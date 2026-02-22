const produtModel = require("../Models/Product");

async function productList(req, res) {
    let products = await produtModel.find({});

    res.render("Partials/admin/_productList", { layout: false , products });
}

async function GetAddProductView(req, res) {
    res.render("Partials/admin/_addProduct", { layout: false });
}

async function AddProduct(req, res) {

    const { name, price} = req.body;

    let product = await produtModel.create({
        name,
        price,
        image: req.file ? `/uploads/${req.file.filename}` : null
    });

    return res.redirect("/");
}

async function GetEditProductView(req, res) {
    const {id} =  req.body;
    let product = await produtModel.findById(id);
    res.render("Partials/admin/_editProduct", { product, layout: false });
}

async function EditProduct(req, res) {
    // const { 
    //     pid,
    //     name,
    //     price 
    // } = req.body;
    // let product = await produtModel.findByIdAndUpdate(pid, {
    //     name,
    //     price
    // });

    const {pid, name, price } = req.body; 
    const updateData = {
            name: name,
            price: price
        };

        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        await produtModel.findByIdAndUpdate(pid, updateData);

    return res.redirect("/");
}

async function DeleteProduct(req, res){
    const { id } = req.body;

    await produtModel.findByIdAndDelete(id);

    return res.redirect("/");
}



module.exports = {
    productList,
    GetAddProductView,
    AddProduct,
    GetEditProductView,
    EditProduct,
    DeleteProduct
}