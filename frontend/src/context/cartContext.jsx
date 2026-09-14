import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Cart ab localStorage se load hoga (login na ho tab bhi kaam kare)
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Jab bhi cartItems change ho, localStorage me save kar do
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Product ko cart me add karna (LOCAL, database nahi)
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            // Check karo pehle se hai kya cart me
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem) {
                // Pehle se hai to quantity +1 kar do
                return prevItems.map(item =>
                    item.id === product.id 
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                );
            } else {
                // Naya hai to add kar do (quantity = 1)
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    // Cart se remove karna
    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
    };

    // Poora cart khali karna (order place hone ke baad)
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    // Total price calculate karna
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Total items count (Navbar me dikhane ke liye)
    const getCartCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ 
            cartItems, addToCart, removeFromCart, clearCart, getTotalPrice, getCartCount 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);