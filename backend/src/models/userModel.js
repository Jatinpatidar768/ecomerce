const db = require('../database/db');

// Naya user register karna
const createUser = (userData, callback) => {
    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [userData.name, userData.email, userData.password, userData.role || 'user'], callback);
    console.log(userData);
    
};

// Email se user dhundhna (login ke time check karne ke liye)
const findUserByEmail = (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], callback);
    console.log(email);
    
};

module.exports = { createUser, findUserByEmail }; 