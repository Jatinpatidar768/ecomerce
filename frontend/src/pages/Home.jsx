import { useState, useEffect } from 'react';
import api from '../api/axios';
import CategoryCard from '../components/categoryCart';
import './Home.css';

function Home() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res.data);
        } catch (error) {
            console.log('Error fetching categories:', error);
        }
    };

    return (
        <div className="home-container">
            <h1>Shop by Category</h1>
            <div className="category-list">
                {categories.map((cat) => (
                    <CategoryCard key={cat.id} category={cat} />
                ))}
            </div>
        </div>
    );
}

export default Home;