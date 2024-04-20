const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    userIdentity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],

    date: {
        type: Date,
        default: Date.now
    }


},
 {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;