import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useCart } from '../context/cartContext';
import './Navbar.css';   // 👈 CSS file import karo

function Navbar() {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { getCartCount } = useCart();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchText.trim() !== '') {
            navigate(`/search?keyword=${searchText}`);
        }
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">MyShop</Link>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search anything"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            <div className="right-side">
                <Link to="/cart" className="nav-link">
                    Cart ({getCartCount()})
                </Link>

                {user ? (
                    <>
                        <span className="nav-link">Hi, {user.name}</span>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="nav-link">Login</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;