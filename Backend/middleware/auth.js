import jwt from 'jsonwebtoken';
import User from '../models/userModels.js';

export default async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Not authorized, token missing' });
    }

    const token = authHeader.split(' ')[1];
    try {
        // read the secret at request time so import order can't break it
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('JWT VERIFICATION FAILED', error.message);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
}