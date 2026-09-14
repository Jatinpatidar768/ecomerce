import { useState, useEffect } from 'react';
import api from '../api/axios';

function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        company_name: '',
        category_id: '',
        subcategory_id: '',
    });
const [imageFile, setImageFile] = useState(null);

const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
};
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
         const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('company_name', formData.company_name);
    data.append('category_id', formData.category_id);
    data.append('subcategory_id', formData.subcategory_id);
    data.append('image', imageFile);
       try {
        await api.post('/products/add', data, {
            headers: { 'Content-Type': 'multipart/form-data' }   // 👈 Important header
        });
        alert('Product added!');
    } catch (error) {
        console.log(error);
    }
};

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            await api.delete(`/products/${id}`);
            alert('Product deleted!');
            fetchProducts();   // List refresh karo
        } catch (error) {
            console.log("hiii",error);
            
            alert('Error deleting product');
        }
    };

    return (
        <div style={styles.container}>
            <h1>Admin Dashboard</h1>

            {/* Add Product Form */}
            <form onSubmit={handleAddProduct} style={styles.form}>
                <h2>Add New Product</h2>
                <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required style={styles.input} />
                <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} style={styles.input} />
                <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required style={styles.input} />
               <input type="file" accept="image/*" onChange={handleFileChange} required style={styles.input} />
                <input name="company_name" placeholder="Company Name" value={formData.company_name} onChange={handleChange} style={styles.input} />

                {/* Category dropdown */}
                <select name="category_id" value={formData.category_id} onChange={handleChange} required style={styles.input}>
                    <option value="">Select Category</option>
                    <option value="1">Men</option>
                    <option value="2">Women</option>
                    <option value="3">Kids</option>
                </select>

                {/* Subcategory dropdown */}
                <select name="subcategory_id" value={formData.subcategory_id} onChange={handleChange} required style={styles.input}>
                    <option value="">Select Subcategory</option>
                    <option value="1">Clothes (Men)</option>
                    <option value="2">Shoes (Men)</option>
                    <option value="3">Clothes (Women)</option>
                    <option value="4">Shoes (Women)</option>
                    <option value="5">Clothes (Kids)</option>
                    <option value="6">Shoes (Kids)</option>
                </select>

                <button type="submit" style={styles.button}>Add Product</button>
            </form>

            {/* Existing Products List */}
            <h2>All Products</h2>
            <div style={styles.list}>
                {products.map((product) => (
                    <div key={product.id} style={styles.productRow}>
                        <span>{product.title} - ₹{product.price}</span>
                        <button onClick={() => handleDelete(product.id)} style={styles.deleteBtn}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '30px',
        maxWidth: '600px',
        margin: '0 auto',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '30px',
    },
    input: {
        padding: '10px',
        fontSize: '14px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#282c34',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    productRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #ddd',
        padding: '10px',
        borderRadius: '4px',
    },
    deleteBtn: {
        padding: '6px 12px',
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default AdminDashboard;