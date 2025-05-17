const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: 'Email already exists' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ msg: 'User registered successfully', userId: user._id });
    } catch (err) {
        res.status(500).json({ msg: 'Signup failed', error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

        // Generate token
        const token = jwt.sign(
            { userId: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ msg: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ msg: 'Login failed', error: err.message });
    }
};
