const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    Items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            image: {
                type: String
            },
            quantity: {
                type: Number,
                min: 1,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true  
    }
},{timestamps: true});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel