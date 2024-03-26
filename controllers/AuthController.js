import UserModel from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { createUser, validateUser, handleUserFromGoogle, setJwtCookie } from '../utils/userUtils.js';
import { createToken, verifyGoogleToken } from '../utils/tokenUtils.js';


const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await userUtils.createUser(username, password);
        const token = tokenUtils.createToken(user._id);

        res.cookie('jwt', token, { httpOnly: true });
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userUtils.validateUser(username, password);

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = tokenUtils.createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true });
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

const googleSignIn = async (req, res) => {
    try {
        const { theToken } = req.body;
        const payload = await tokenUtils.verifyGoogleToken(theToken, client);
        const user = await userUtils.handleUserFromGoogle(payload);

        const token = tokenUtils.createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true });
        res.redirect('/tasks');
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
};

export { register, login, googleSignIn };
