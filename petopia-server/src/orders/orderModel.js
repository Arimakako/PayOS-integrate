const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  items: [{
    productId: String,
    name: String,
    quantity: Number,
    price: Number,
  }],
  subtotal: Number,
  total: Number,
  status: { type: String, default: 'Pending' },
  downloadLink: { type: String } // Add this field for digital products
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
