const {
    getAllProducts,
    getProductsByFilter,
    getProductsByCompany,
    searchProducts,
    addProduct,
    deleteProduct
} = require('../models/productsModel');

// Sabhi products
const getProducts = (req, res) => {
    getAllProducts((err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching products' });
        res.status(200).json(results);
    });
};

// Category + Subcategory ke hisaab se (Men > Clothes)
const filterProducts = (req, res) => {
    const { categoryId, subcategoryId } = req.params;
    getProductsByFilter(categoryId, subcategoryId, (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching products' });
        res.status(200).json(results);
    });
};

// Company ke hisaab se (Nike ke sab products)
const companyProducts = (req, res) => {
    const { companyName } = req.params;
    getProductsByCompany(companyName, (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching products' });
        res.status(200).json(results);
    });
};

// Search bar
const search = (req, res) => {
    const { keyword } = req.query;
    searchProducts(keyword, (err, results) => {
        if (err) return res.status(500).json({ message: 'Error searching' });
        res.status(200).json(results);
    });
};

// Admin: Add product
const createProduct = (req, res) => {
    const productData = req.body;
      if (req.file) {
        productData.image_url = `http://localhost:5000/uploads/${req.file.filename}`;
    }
    addProduct(productData, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error adding product' });
        res.status(201).json({ message: 'Product added successfully!' });
    });
};

// Admin: Delete product
const removeProduct = (req, res) => {
    const { id } = req.params;
    deleteProduct(id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error deleting product' });
        res.status(200).json({ message: 'Product deleted successfully!' });
    });
};

module.exports = { getProducts, filterProducts, companyProducts, search, createProduct, removeProduct };