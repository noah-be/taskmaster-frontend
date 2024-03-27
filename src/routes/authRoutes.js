import AuthController from '../controllers/AuthController.js';
import express from 'express';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/googleSignIn', AuthController.googleSignIn);
router.get('/check-username', AuthController.checkUsername);

export default router;
