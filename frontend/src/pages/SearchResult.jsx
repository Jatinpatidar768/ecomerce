import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchResults();
    }, [keyword]);

    const fetchResults = async () => {
        try {
            const res = await api.get(`/products/search?keyword=${keyword}`);
            setProducts(res.data);
        } catch (error) {
            console.log('Search error:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h1>Search Results for "{keyword}"</h1>
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
    container: { padding: '30px' },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
    },
};

export default SearchResults;