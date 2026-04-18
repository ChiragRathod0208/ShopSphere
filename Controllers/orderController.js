const cartModel = require('../Models/Cart');
const orderModel = require('../Models/Order');

async function placeOrder(req, res) {
    const user = req.user._id;

    const cart = await cartModel.findOne({user: req.user}).populate("Items.product");
    
    // console.log("Cart From Order : ", cart);

    const orderItems = cart.Items.map(item => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image
    }));

    const totalAmount = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    await orderModel.create({
        user: user,
        Items: orderItems,
        totalAmount
    });

    cart.Items = [];
    await cart.save();

    res.redirect('/');
}

async function viewOrders(req, res) {
    const user = req.user._id;

    let orderData = await orderModel.find({user: user})
        .populate("user", "name email")
        .sort({ createdAt: -1 });

        // orderData.forEach((order, idx) => {
        //     console.log("Oreder : ", idx + 1);
        //     order.Items.forEach((item) => {
        //         console.log("Item Name : ", item.name);
        //         console.log("Item image : ", item.image);
        //     })
        // })

    return res.render('Partials/user/_myOrderView', { layout: req.layout , orders: orderData});
}

async function GetallOrders(req, res) {
    let orders = await orderModel.find({})
        .populate("user", "name email")
        .sort({ createdAt: -1 });

    res.render("Partials/admin/_orderList", { layout: false , orders });
}

module.exports = {
    placeOrder,
    viewOrders,
    GetallOrders
}