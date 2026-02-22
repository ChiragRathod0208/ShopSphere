const cartModel = require('../Models/Cart');

async function addToCart(req, res) {
    const user = req.user._id;
    const product = req.body.pid;
    
    // console.log("Body : ", req.body.pid);
    // console.log("Product Id :", product);

    let cart = await cartModel.findOne({user: user});

    if(!cart)
    {
        cart = await cartModel.create({
            user: user,
            Items: []
        })
    }
    const itemIndex = cart.Items.findIndex( item => item.product.toString() === product);

    if (itemIndex > -1) {
        cart.Items[itemIndex].quantity += 1;
    } else {
        cart.Items.push({ product: product });
    }

    await cart.save();

    res.redirect("/");
}

async function getCart(req, res) {

    let cart = await cartModel.findOne({user: req.user}).populate('Items.product');
    // let ci = cart.populate('Items.product');
    // console.log("Cart : ", cart.Items);
    // console.log("Cart Items : ", ci);
    // cart.Items.forEach(element => {
    //     console.log(element);
    // });

    if( cart.Items === null || (cart.Items).length > 0)
    {
        return res.render("Partials/user/_cartView", { layout: req.layout, cart: cart});
    } else {
        return res.render("Partials/user/_emptyCartView", { layout: req.layout });
    }
}

async function updateQuantity(req, res) {
    const user = req.user._id;
    const { pid, action } = req.body;

    let cart = await cartModel.findOne({user: user});

    const itemIndex = cart.Items.findIndex( item => item.product.toString() === pid);

    if(action === 'inc')
    {
        cart.Items[itemIndex].quantity += 1;
    }

    if(action === 'dec')
    {
        if(cart.Items[itemIndex].quantity === 1)
        {
            cart.Items.splice(itemIndex, 1);
        }
        else
        {
            cart.Items[itemIndex].quantity -= 1;
        }
    }

    if(itemIndex.quantity <= 0)
    {
        cart.Items.filter( item => item.product.toString() !== pid);
    }

    await cart.save();

    return res.redirect('/');
}
module.exports = {
    addToCart,
    getCart,
    updateQuantity
}