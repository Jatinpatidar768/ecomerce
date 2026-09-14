const db = require('../database/db');

// Category ke andar wale subcategories (jaise Men > Clothes, Men > Shoes)
const getSubcategoriesByCategory = (categoryId, callback) => {
    const sql = 'SELECT * FROM subcategories WHERE category_id = ?';
    db.query(sql, [categoryId], callback);
    console.log(categoryId);
    
};

module.exports = { getSubcategoriesByCategory };