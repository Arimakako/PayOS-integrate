// productService.js
const productModel = require('./productModel');

const getAllProducts = (filterOptions, sort) => {
    return productModel.findAllFiltered(filterOptions, sort);
};

const getProduct = (id) => {
    return productModel.findById(id);
};

const addProduct = (product) => {
    return productModel.create(product);
};

const updateProduct = (id, product) => {
    return productModel.update(id, product);
};

// Delete product
const deleteProduct = (id) => {
    return productModel.remove(id);
};
module.exports = { getAllProducts, getProduct, addProduct, updateProduct, deleteProduct };
