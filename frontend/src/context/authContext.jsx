import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Page refresh hone pe bhi login yaad rahe, isliye localStorage se check karo
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
            //  localStorage.removeItem('cart');
        setUser(userData);
        // window.location.reload(); 
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        //  localStorage.removeItem('cart');
        setUser(null);
            // window.location.reload();  
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook - isse har component me easily user info mil jayegi
export const useAuth = () => useContext(AuthContext);