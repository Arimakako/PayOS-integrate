const express = require("express");
const PayOs = require("@payos/node");
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require("morgan");
const userRoutes = require('./route/routes');
const productRoutes = require('./route/productRoutes');
const orderRoutes = require('./route/orderRoutes');
const OrderController = require('D:/PAYOS/final-web-master/final-web-master/petopia-server/src/orders/orderController.js');
const port = process.env.PORT || 9992;

const app = express();

const payos = new PayOs(
  "51abb182-b478-4870-8798-e6bc41a62231", 
  "ac857806-b8c2-4299-83f4-0ddb0e37fb02", 
  "81a34afd2c940af46feb5a1394010025a01e95432d72bf9cc3366ecd6304a170"
);

// Middleware
app.use(morgan("combined"));
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:4200" }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/petopiadb", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log("Successfully connected to DB"))
.catch(error => console.log("Error connecting to DB:", error));

// Routes
app.use(userRoutes);
app.use('/products', productRoutes);
app.use("/orders", orderRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something broke!' });
});

// Order Controller Routes
app.post('/place-order', OrderController.placeOrder);
app.get('/track-order/:id', OrderController.trackOrder);

app.get('/payment-success', OrderController.handlePaymentSuccess);

app.get('/payment-failure', (req, res) => {
  res.redirect('http://localhost:4200/check');
});

// Starting the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
