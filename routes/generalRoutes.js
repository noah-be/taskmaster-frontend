import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('main', { content: 'home' });
});

router.get('/about', (req, res) => {
    res.render('main', { content: 'about' });
});

router.get('/contact', (req, res) => {
    res.render('main', { content: 'contact' });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    res.send(`Received username: ${username} and password: ${password}`);
});

export default router;
