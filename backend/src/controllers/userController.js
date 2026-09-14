const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

// ================= REGISTER =================
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Step 1: Check karo email pehle se hai ya nahi
        findUserByEmail(email, async (err, results) => {
            if (err) return res.status(500).json({ message: 'Server error' });

            if (results.length > 0) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            // Step 2: Password ko hash karo (plain text save nahi karna)
            const hashedPassword = await bcrypt.hash(password, 10);

            // Step 3: User create karo (default role = 'user')
            const userData = { name, email, password: hashedPassword, role: 'user' };

            createUser(userData, (err, result) => {
                if (err) return res.status(500).json({ message: 'Error creating user' });
                res.status(201).json({ message: 'User registered successfully!' });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// ================= LOGIN =================
const loginUser = (req, res) => {
    const { email, password } = req.body;

    // Step 1: Email se user dhundo
    findUserByEmail(email, async (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });

        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        // Step 2: Password match karo (hashed password se compare)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Step 3: JWT Token banao (isme role bhi save hoga)
        const token = jwt.sign(
            { id: user.id, role: user.role },   // payload (jo data token ke andar hoga)
            process.env.JWT_SECRET,              // secret key (.env se)
            { expiresIn: '7d' }                  // token 7 din tak valid rahega
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            role: user.role,   // frontend isse decide karega admin page bhejna hai ya home
            name: user.name
        });
    });
};

module.exports = { registerUser, loginUser };