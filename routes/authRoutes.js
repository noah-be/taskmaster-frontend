import express from 'express';
import { register, login, googleSignIn } from '../controllers/AuthController.js';
import UserModel from '../models/UserModel.js';
import { checkUsername } from '../utils/userUtils.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/googleSignIn', googleSignIn);
router.get('/check-username', async (req, res) => {
    const { username } = req.query;

    const userExists = await UserModel.findOne({ username });
    if (userExists) {
        return res.json({ isAvailable: false });
    } else {
        return res.json({ isAvailable: true });
    }
});

export default router;
