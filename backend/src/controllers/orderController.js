const { createOrder } = require('../models/orderModel');
const { getCartByUser, removeFromCart } = require('../models/cartModel');

// Payment/Checkout ke time order create karna
const placeOrder = (req, res) => {
    const userId = req.user.id;   // JWT token se aayega (middleware se)

    // Step 1: Pehle user ka pura cart nikालो (total amount calculate karne ke liye)
    getCartByUser(userId, (err, cartItems) => {
        if (err) return res.status(500).json({ message: 'Error fetching cart' });

        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Step 2: Total amount calculate karo (sabhi items ki price * quantity jodkar)
        let totalAmount = 0;
        cartItems.forEach(item => {
            totalAmount += item.price * item.quantity;
        });

        // Step 3: Order table me entry banao
        createOrder(userId, totalAmount, (err, result) => {
            if (err) return res.status(500).json({ message: 'Error placing order' });

            // Step 4: Order ban gaya, ab cart khali kar do
            cartItems.forEach(item => {
                removeFromCart(item.id, () => {});
            });

            res.status(201).json({
                message: 'Order placed successfully!',
                orderId: result.insertId,
                totalAmount
            });
        });
    });
};

module.exports = { placeOrder };