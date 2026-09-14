import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartContext';
import { useAuth } from '../context/authContext';
import api from '../api/axios';

function Cart() {
    const { cartItems, removeFromCart, clearCart, getTotalPrice } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handlePayment = async () => {
        // Check karo login hai ya nahi
        if (!user) {
            // Login nahi hai → Login page bhejo, 
            // saath me "state" me bata do ki wapas kaha aana hai
            navigate('/login', { state: { from: '/cart' } });
            return;
        }

        // Login hai → order place karo
        try {
            // Step 1: Local cart ke sabhi items backend cart me daalo
            for (const item of cartItems) {
                await api.post('/cart/add', { productId: item.id });
            }

            // Step 2: Order place karo
            const res = await api.post('/orders/place');

            // Step 3: Local cart khali karo
            clearCart();

            alert(`Order placed successfully! Total: ₹${res.data.totalAmount}`);
            navigate('/');
        } catch (error) {
            console.log('Order error:', error);
            alert('Something went wrong while placing order');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div style={styles.container}>
                <h2>Your cart is empty</h2>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h1>Your Cart</h1>

            {cartItems.map((item) => (
                <div key={item.id} style={styles.item}>
                    <img src={item.image_url} alt={item.title} style={styles.image} />
                    <div style={styles.details}>
                        <h3>{item.title}</h3>
                        <p>₹{item.price} x {item.quantity}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={styles.removeBtn}>
                        Remove
                    </button>
                </div>
            ))}

            <h2 style={styles.total}>Total: ₹{getTotalPrice()}</h2>

            <button onClick={handlePayment} style={styles.payButton}>
                Payment
            </button>
        </div>
    );
}

const styles = {
    container: {
        padding: '30px',
        maxWidth: '600px',
        margin: '0 auto',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        borderBottom: '1px solid #ddd',
        padding: '10px 0',
    },
    image: {
        width: '70px',
        height: '70px',
        objectFit: 'cover',
    },
    details: {
        flex: 1,
    },
    removeBtn: {
        padding: '6px 12px',
        cursor: 'pointer',
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
    },
    total: {
        marginTop: '20px',
    },
    payButton: {
        padding: '12px 25px',
        backgroundColor: '#282c34',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '15px',
        width: '100%',
    },
};

export default Cart;