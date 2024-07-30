const express = require('express');
const router = express.Router();
const OrderController = require('../src/orders/orderController');

router.post('/', OrderController.placeOrder); // Endpoint for placing an order
router.get('/:id', OrderController.trackOrder); // Endpoint for tracking an order by ID

module.exports = router;
