const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
}, { timestamps: true})

const cartModel = mongoose.model('cart', cartSchema);

module.exports = cartModel;