// productController.js
const productService = require('./productService');

const getProducts = async (req, res) => {
    try {
        const { lowerPrice, upperPrice, cate, pettype, sort } = req.query;
        const filterOptions = {};
        
        // Xây dựng điều kiện lọc dựa trên tham số truy vấn
        if (lowerPrice || upperPrice) {
            filterOptions.price = { $gte: parseInt(lowerPrice) || 0, $lte: parseInt(upperPrice) || Infinity };
        }
        if (cate) {
            filterOptions.cate = cate;
        }
        if (pettype) {
            filterOptions.pettype = pettype;
        }

        const products = await productService.getAllProducts(filterOptions, sort);

        // Thêm đơn vị tiền tệ "VND" vào mỗi sản phẩm
        const productsWithCurrency = products.map(product => ({
            ...product,
            currency: 'VND'  // Thêm thông tin đơn vị tiền tệ.
        }));

        res.json(productsWithCurrency);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await productService.getProduct(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = await productService.addProduct(req.body);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update product
const updateProduct = async (req, res) => {
    const productId = req.params.id;  // Use the ID from the route
    const updateData = req.body;

    try {
        const updateResult = await productService.updateProduct(productId, updateData);
        if (!updateResult.modifiedCount) {
            return res.status(404).json({ message: "No product found or no change made with the given ID" });
        }

        const updatedProduct = await productService.getProduct(productId);
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    const productId = req.params.id;  // Use the ID from the route

    try {
        const productToDelete = await productService.getProduct(productId);
        if (!productToDelete) {
            return res.status(404).json({ message: "No product found with the given ID" });
        }

        await productService.deleteProduct(productId);
        res.json({ message: "Product successfully deleted", product: productToDelete });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
