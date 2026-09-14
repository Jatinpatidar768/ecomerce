import { useCart } from '../context/cartContext';

function ProductCard({ product }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        alert(`${product.title} added to cart!`);
    };

    return (
        <div style={styles.card}>
            <img src={product.image_url} alt={product.title} style={styles.image} />
            <h3 style={styles.title}>{product.title}</h3>
            <p style={styles.desc}>{product.description}</p>
            <p style={styles.price}>₹{product.price}</p>
            <button onClick={handleAddToCart} style={styles.button}>
                Add to Cart
            </button>
        </div>
    );
}

const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        width: '220px',
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: '180px',
        objectFit: 'cover',
        borderRadius: '4px',
    },
    title: {
        fontSize: '16px',
        margin: '10px 0 5px',
    },
    desc: {
        fontSize: '13px',
        color: '#666',
        height: '35px',
        overflow: 'hidden',
    },
    price: {
        fontWeight: 'bold',
        fontSize: '18px',
        margin: '8px 0',
    },
    button: {
        padding: '8px 15px',
        backgroundColor: '#282c34',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
    },
};

export default ProductCard;