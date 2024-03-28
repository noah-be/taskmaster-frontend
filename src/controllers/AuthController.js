import UserModel from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
    OAuth2Client
} from 'google-auth-library';
import {
    createUser,
    validateUser,
    handleUserFromGoogle
} from '../utils/userUtils.js';
import {
    createToken,
    verifyGoogleToken
} from '../utils/tokenUtils.js';
import {
    setJwtCookie,
    finalizeAuthentication
} from '../utils/authUtils.js';


const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const AuthController = {
    async register(req, res) {
        try {
            const {
                username,
                password
            } = req.body;
            if (!username || !password) {
                return res.status(400).json({
                    message: 'Username and password are required'
                });
            }

            const user = await createUser(username, password);
            const token = createToken(user._id);

            setJwtCookie(res, token);
            res.redirect('/tasks');
        } catch (error) {
            res.status(500).json({
                message: 'Error registering user',
                error: error.message
            });
        }
    },

    async login(req, res) {
        try {
            const {
                username,
                password
            } = req.body;
            const user = await validateUser(username, password);

            if (!user) {
                return res.status(400).json({
                    message: 'Invalid credentials'
                });
            }

            const token = createToken(user._id);
            setJwtCookie(res, token);
            res.redirect('/tasks');
        } catch (error) {
            res.status(500).json({
                message: 'Login failed',
                error: error.message
            });
        }
    },

    async googleSignIn(req, res) {
        try {
            const {
                theToken
            } = req.body;
            const payload = await verifyGoogleToken(theToken, client);
            const user = await handleUserFromGoogle(payload);

            const token = createToken(user._id);
            setJwtCookie(res, token);
            res.redirect('/tasks');
        } catch (error) {
            res.status(401).json({
                message: 'Authentication failed',
                error: error.message
            });
        }
    },
    async checkUsername(req, res) {
        try {
            const {
                username
            } = req.query;
            const userExists = await UserModel.findOne({
                username
            });
            if (userExists) {
                return res.json({
                    isAvailable: false
                });
            } else {
                return res.json({
                    isAvailable: true
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
};

export default AuthController;