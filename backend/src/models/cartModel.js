const db = require('../database/db');

// Cart me product add karna
const addToCart = (userId, productId, callback) => {
    const sql = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)';
    db.query(sql, [userId, productId], callback);
};

// User ka pura cart dikhana (product details ke sath)
const getCartByUser = (userId, callback) => {                                                                        
    const sql = `
        SELECT cart.id, cart.quantity, products.title, products.price, products.image_url 
        FROM cart 
        JOIN products ON cart.product_id = products.id 
        WHERE cart.user_id = ?
    `;
    db.query(sql, [userId], callback);
};

// Cart se item remove karna
const removeFromCart = (cartId, callback) => {
    const sql = 'DELETE FROM cart WHERE id = ?';
    db.query(sql, [cartId], callback);
};

module.exports = { addToCart, getCartByUser, removeFromCart };