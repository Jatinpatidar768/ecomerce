const db = require('../database/db');

// Sabhi products laana
const getAllProducts = (callback) => {
    db.query('SELECT * FROM products', callback);
};

// Category + Subcategory ke hisaab se products laana
// (jaise: Men > Clothes wale products)
const getProductsByFilter = (categoryId, subcategoryId, callback) => {
    const sql = 'SELECT * FROM products WHERE category_id = ? AND subcategory_id = ?';
    db.query(sql, [categoryId, subcategoryId], callback);
};

// Company ke hisaab se products laana
const getProductsByCompany = (companyName, callback) => {
    const sql = 'SELECT * FROM products WHERE company_name = ?';
    db.query(sql, [companyName], callback);
};

// Search bar ke liye (title me match dhundhna)
const searchProducts = (keyword, callback) => {
    const sql = 'SELECT * FROM products WHERE title LIKE ?';
    db.query(sql, [`%${keyword}%`], callback);
};

// Admin: naya product add karna
const addProduct = (productData, callback) => {
    const sql = 'INSERT INTO products SET ?';
    db.query(sql, productData, callback);
};

// Admin: product delete karna
const deleteProduct = (productId, callback) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [productId], callback);
};

module.exports = { getAllProducts, getProductsByFilter, getProductsByCompany, searchProducts, addProduct, deleteProduct };