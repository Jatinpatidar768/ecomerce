import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function AdminRoute({ children }) {
    const { user } = useAuth();

    // Login nahi hai → login page bhejo
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Login hai lekin admin nahi hai → home bhejo
    if (user.role !== 'admin') {
        return <Navigate to="/" />;
    }

    // Sab sahi hai → andar jaane do
    return children;
}

export default AdminRoute;