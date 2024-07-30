// productModel.js
const { MongoClient, ObjectId } = require('mongodb');

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "petopiadb";
let db;
let productCollection;

client.connect().then(client => {
    db = client.db(dbName);
    productCollection = db.collection("product");
    console.log("Connected successfully to the database");
});

const findAll = async () => {
    return await productCollection.find({}).toArray();
};

const findById = async (id) => {
    return await productCollection.findOne({ _id: new ObjectId(id) });
};

const create = async (product) => {
    return await productCollection.insertOne(product);
};

const update = async (id, product) => {
    // Tạo một bản sao của đối tượng sản phẩm để loại bỏ trường '_id'
    let updateData = { ...product };
    delete updateData._id; 

    // Thực hiện cập nhật mà không thay đổi trường '_id'
    const result = await productCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
    );
    return result;
};
// Delete product
const remove = async (id) => {
    return await productCollection.deleteOne({ _id: new ObjectId(id) });
};

const findAllFiltered = async (filterOptions, sort) => {
    let sortOptions = {};
    if (sort === 'asc') {
        sortOptions.price = 1; // Sắp xếp giá tăng dần
    } else if (sort === 'desc') {
        sortOptions.price = -1; // Sắp xếp giá giảm dần
    }
    return await productCollection.find(filterOptions).sort(sortOptions).toArray();
};

module.exports = { findAll, findById, create, update, remove, findAllFiltered };
