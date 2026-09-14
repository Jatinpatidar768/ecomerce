import { useNavigate } from 'react-router-dom';
import './categoryCart.css';

function CategoryCard({ category }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/category/${category.id}`);
    };

    return (
        <div className="category-card" onClick={handleClick}>
            <h2>{category.name}</h2>
        </div>
    );
}

export default CategoryCard;