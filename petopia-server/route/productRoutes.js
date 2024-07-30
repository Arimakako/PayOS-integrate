// productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../src/product/productController');
const cors = require('cors');
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', productController.createProduct);
// Update product
router.put("/:id", cors(), productController.updateProduct);

// Delete product
router.delete("/:id", cors(), productController.deleteProduct);

module.exports = router;