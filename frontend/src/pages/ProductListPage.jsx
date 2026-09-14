import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

function ProductListPage() {
    const { categoryId, subcategoryId } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, [categoryId, subcategoryId]);

    const fetchProducts = async () => {
        try {
            const res = await api.get(`/products/filter/${categoryId}/${subcategoryId}`);
            setProducts(res.data);
        } catch (error) {
            console.log('Error fetching products:', error);
        }
    };


    return (
        <div style={styles.container}>
            <h1>Products</h1>
            <div style={styles.grid}>
                {products.length === 0 ? (
                    <p>No products found</p>
                ) : (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '30px',
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
    },
};

export default ProductListPage;