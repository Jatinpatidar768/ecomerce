

const express = require("express");
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const db = require("./src/database/db.js");


const app = express();
app.use(cors()); 
app.use(express.json()); 

const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productsRoutes');
const cartRoutes = require('./src/routes/cartRoutes.js');
const categoryRoutes = require('./src/routes/categoryRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

app.use('/uploads',express.static('uploads'));
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);

app.get("/", (req,res) => {
  // is a route get: client server se data mang rha hai, /:root url,(req,res):Ye callback function ko Express automatically do objects deta hai.
  res.send("backend is ruuning suucesfully hiii"); //server send response to cliet
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 