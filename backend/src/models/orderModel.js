const db = require('../database/db');

// Payment ke baad order create karna
const createOrder = (userId, totalAmount, callback) => {
    const sql = 'INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, "Pending")';
    db.query(sql, [userId, totalAmount], callback);
};

module.exports = { createOrder };