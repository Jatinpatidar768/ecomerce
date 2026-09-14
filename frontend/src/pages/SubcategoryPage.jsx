import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

function SubcategoryPage() {
    const { categoryId } = useParams();   // URL se categoryId nikala
    const navigate = useNavigate();
    const [subcategories, setSubcategories] = useState([]);

    // useEffect(() => {
    //     fetchSubcategories();
    // }, [categoryId]);   // Jab bhi categoryId change ho, dobara fetch karo

    const fetchSubcategories = async (res) => {
        try {
            const res = await api.get(`/categories/${categoryId}/subcategories`);
            setSubcategories(res.data);
        } catch (error) {
            console.log('Error fetching subcategories:', error);
//             console.log('Category ID:', categoryId);
// console.log('Fetched subcategories:', res.data);
        }
    };
 useEffect(() => {
        fetchSubcategories();
    }, [categoryId]); 
   
    const handleClick = (subcategoryId) => {
        // Clothes/Shoes pe click karte hi products page pe bhejo
        navigate(`/products/${categoryId}/${subcategoryId}`);
    };

    return (
        <div style={styles.container}>
            <h1>Choose an Option</h1>
            <div style={styles.list}>
                {subcategories.map((sub) => (
                    <div
                        key={sub.id}
                        style={styles.card}
                        onClick={() => handleClick(sub.id)}
                    >
                        <h2>{sub.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '30px',
        textAlign: 'center',
    },
    list: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '30px',
    },
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '40px',
        textAlign: 'center',
        cursor: 'pointer',
        width: '200px',
        backgroundColor: '#f5f5f5',
    },
};

export default SubcategoryPage;