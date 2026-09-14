const jwt = require('jsonwebtoken');

// Check karega: User login hai ya nahi (Token valid hai ya nahi)
const verifyToken = (req, res, next) => {
    // Step 1: Header se token nikalo
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided. Please login.' });
    }

    // Token aisa aata hai: "Bearer xxxxxxxxxx" — hume sirf token chahiye
    const token = authHeader.split(' ')[1];

    // Step 2: Token verify karo
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token. Please login again.' });
        }

        // Step 3: Token sahi hai — uski info request me daal do
        req.user = decoded;   // { id: ..., role: ... }
        next();   // 👈 Aage jaane do (controller tak)
    });
};

// Check karega: User "admin" hai ya nahi
const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();   // Admin hai, aage jaane do
};

module.exports = { verifyToken, verifyAdmin };