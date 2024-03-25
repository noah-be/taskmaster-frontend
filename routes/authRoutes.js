import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secretKey = process.env.JWT_SECRET;
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username is already taken');
        }

        const user = new User({ username, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1d' });

        const isLocalhost = req.hostname === 'localhost';
        res.cookie('token', token, { httpOnly: true, secure: !isLocalhost, sameSite: 'strict' });

        res.json({ message: 'Authentication successful' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1d' });

        const isLocalhost = req.hostname === 'localhost';
        res.cookie('token', token, { httpOnly: true, secure: !isLocalhost, sameSite: 'strict' });

        res.json({ message: 'Authentication successful' });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error during login');
    }
});


router.get('/check-username', async (req, res) => {
    const { username } = req.query;

    const userExists = await User.findOne({ username });
    if (userExists) {
        return res.json({ isAvailable: false });
    } else {
        return res.json({ isAvailable: true });
    }
});


export default router;
