import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/authContext';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await api.post('/users/login', formData);
            const { token, role, name } = res.data;

            // AuthContext ke login function ko call karo (token + user info save karega)
            login({ name, role }, token);

            // Role ke hisaab se redirect karo
            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');   // ya /cart, agar payment se yaha aaye the
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2>Login</h2>

                {error && <p style={styles.error}>{error}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>Login</button>

                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        gap: '10px',
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
    error: {
        color: 'red',
    },
};

export default Login;