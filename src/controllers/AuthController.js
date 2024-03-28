import UserModel from '../models/UserModel.js';
import {
    OAuth2Client
} from 'google-auth-library';

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

            const user = await userUtility.createUser(username, password);
            finalizeAuthentication(res, user._id);

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

            finalizeAuthentication(res, user._id);

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
            finalizeAuthentication(res, user._id);
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