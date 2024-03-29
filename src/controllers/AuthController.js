import {
    OAuth2Client
} from 'google-auth-library';
import {
    createUser,
    validateUser
} from '../utils/userUtils.js';
import {
    finalizeAuthentication,
    handleUserFromGoogle
} from '../utils/authUtils.js';
import {
    verifyGoogleToken
} from '../utils/tokenUtils.js';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const AuthController = {
    async register(req, res, next) {
        const {
            username,
            password
        } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                message: 'Username and password are required'
            });
        }
        try {
            const user = await createUser(username, password);
            res.status(201).json({
                message: 'User successfully registered',
                userId: user._id
            });
            finalizeAuthentication(res, user._id);
        } catch (error) {
            next(error);
        }
    },
    async login(req, res, next) {
        const {
            username,
            password
        } = req.body;
        try {
            const user = await validateUser(username, password);
            if (!user) {
                return res.status(400).json({
                    message: 'Invalid credentials'
                });
            }
            res.status(200).json({
                message: 'Login successful',
                userId: user._id
            });
            finalizeAuthentication(res, user._id);
        } catch (error) {
            next(error);
        }
    },
    async googleSignIn(req, res, next) {
        const {
            theToken
        } = req.body;
        try {
            const payload = await verifyGoogleToken(theToken, client);
            const user = await handleUserFromGoogle(payload);
            res.status(200).json({
                message: 'Google sign in successful',
                userId: user._id
            });
            finalizeAuthentication(res, user._id);
        } catch (error) {
            next(error);
        }
    }
};

export default AuthController;