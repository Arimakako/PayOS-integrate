const Order = require('./orderModel');

const createOrder = async (orderData) => {
  const order = new Order(orderData);
  return await order.save();
};

const getOrderById = async (id) => {
  const order = await Order.findOne({ orderId: id });
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

module.exports = {
  createOrder,
  getOrderById,
};
