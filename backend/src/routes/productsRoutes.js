const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload")
const {
    getProducts,
    filterProducts,
    companyProducts,
    search,
    createProduct,
    removeProduct
} = require('../controllers/productController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// Public routes (koi bhi dekh sakta hai, login zaroori nahi)
router.get('/', getProducts);                                        // Sabhi products
router.get('/search', search);                                       // Search bar
router.get('/filter/:categoryId/:subcategoryId', filterProducts);    // Men > Clothes
router.get('/company/:companyName', companyProducts);                // Nike ke products

// Admin-only routes (login + admin dono zaroori)
router.post('/add', verifyToken, verifyAdmin, upload.single('image'), createProduct);
router.delete('/:id', verifyToken, verifyAdmin, removeProduct);

module.exports = router; 