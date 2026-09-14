const { getAllCategories } = require('../models/categoryModel');
const { getSubcategoriesByCategory } = require('../models/subcategoryModel');

const getCategories = (req, res) => {
    getAllCategories((err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching categories' });
        res.status(200).json(results);
    });
};

const getSubcategories = (req, res) => {
    const { categoryId } = req.params;
    getSubcategoriesByCategory(categoryId, (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching subcategories' });
        res.status(200).json(results);
    });
};

module.exports = { getCategories, getSubcategories };