import User from '../models/userModels.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const TOKEN_EXPIRES_IN = '24h';

function signToken(id) {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not found on server');
    return jwt.sign({ id: id.toString() }, secret, { expiresIn: TOKEN_EXPIRES_IN });
}

// REGISTER
export async function register(req, res) {
    try {
        const name = req.body.name?.trim();
        const email = req.body.email?.toLowerCase().trim();
        const password = req.body.password;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email' });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
        }

        const exists = await User.findOne({ email }).lean();
        if (exists) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        // check the secret BEFORE saving, so a failure never leaves a half-created user
        if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not found on server');

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });
        const token = signToken(newUser._id);

        return res.status(201).json({
            success: true,
            message: 'Account created successfully',
            token,
            user: { id: newUser._id.toString(), name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

// LOGIN
export async function login(req, res) {
    try {
        const email = req.body.email?.toLowerCase().trim();
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const user = await User.findOne({ email });
        const isMatch = user ? await bcrypt.compare(password, user.password) : false;

        // same message and status for unknown email and wrong password
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        const token = signToken(user._id);

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: { id: user._id.toString(), name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}