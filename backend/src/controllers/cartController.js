const { addToCart, getCartByUser, removeFromCart } = require('../models/cartModel');

// Cart me add karna
const addItemToCart = (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;   // 👈 ye JWT token se aayega (middleware se)

    addToCart(userId, productId, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error adding to cart' });
        res.status(201).json({ message: 'Added to cart!' });
    });
};

// Cart dikhana
const viewCart = (req, res) => {
    const userId = req.user.id;

    getCartByUser(userId, (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching cart' });
        res.status(200).json(results);
    });
};

// Cart se remove karna
const deleteCartItem = (req, res) => {
    const { id } = req.params;

    removeFromCart(id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error removing item' });
        res.status(200).json({ message: 'Item removed from cart!' });
    });
};

module.exports = { addItemToCart, viewCart, deleteCartItem };