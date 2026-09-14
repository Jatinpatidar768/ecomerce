import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { CartProvider } from './context/cartContext';

import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SubcategoryPage from './pages/SubcategoryPage';
import ProductListPage from './pages/ProductListPage';
import SearchResults from './pages/SearchResult';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/category/:categoryId" element={<SubcategoryPage />} />
                        <Route path="/products/:categoryId/:subcategoryId" element={<ProductListPage />} />
                        <Route path="/search" element={<SearchResults />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
                        <Route 
    path="/admin" 
    element={
        <AdminRoute>
            <AdminDashboard />
        </AdminRoute>
    } 
/>
                        
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;