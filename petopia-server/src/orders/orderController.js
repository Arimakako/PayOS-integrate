const OrderService = require('./orderService');
const { v4: uuidv4 } = require('uuid');
const PayOs = require("@payos/node");

const YOUR_DOMAIN = "http://localhost:4200";

const payos = new PayOs(
  "51abb182-b478-4870-8798-e6bc41a62231", 
  "ac857806-b8c2-4299-83f4-0ddb0e37fb02", 
  "81a34afd2c940af46feb5a1394010025a01e95432d72bf9cc3366ecd6304a170"
);

// Hàm để tạo mã orderCode hợp lệ
function generateOrderCode() {
  return Math.floor(Math.random() * 9007199254740991) + 1;
}

class OrderController {
  async placeOrder(req, res) {
    try {
      console.log("Received request to place order", req.body);
      const orderData = { ...req.body, orderId: uuidv4(), status: 'Pending' };
      const orderCode = generateOrderCode();

      console.log("Creating payment link for bank transfer.");
      const paymentLinkData = {
        amount: orderData.total,
        description: "Payment for order",
        orderCode: orderCode, // Sử dụng orderCode hợp lệ
        returnUrl: `${YOUR_DOMAIN}/payment-success?orderId=${orderData.orderId}`,
        cancelUrl: `${YOUR_DOMAIN}/payment-failure`
      };

      const paymentLink = await payos.createPaymentLink(paymentLinkData);
      console.log("Payment link created successfully", paymentLink);

      return res.status(201).json({ 
        message: 'Order created, awaiting payment', 
        orderData,
        paymentLink: paymentLink.checkoutUrl 
      });

    } catch (error) {
      console.error("Error creating order", error);
      res.status(500).json({ message: 'Error creating order', error });
    }
  }

  async handlePaymentSuccess(req, res) {
    try {
      const orderId = req.query.orderId;
      const orderData = {
        ...req.body,
        status: 'Confirmed'
      };
      const order = await OrderService.createOrder(orderData);
      console.log("Payment confirmed, order saved", order);
      res.redirect(`http://localhost:4200/track-order/${orderId}`);
    } catch (error) {
      console.error("Error handling payment success", error);
      res.status(500).json({ message: 'Error handling payment success', error });
    }
  }

  async trackOrder(req, res) {
    try {
      const orderId = req.params.id;
      const order = await OrderService.getOrderById(orderId);
      res.status(200).json(order);
    } catch (error) {
      if (error.message === 'Order not found') {
        res.status(404).json({ message: 'Order not found' });
      } else {
        res.status(500).json({ message: 'Error tracking order', error });
      }
    }
  }
}

module.exports = new OrderController();
