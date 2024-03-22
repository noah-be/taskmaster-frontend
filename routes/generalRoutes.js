import express from 'express';
import Task from '../models/Task.js'
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

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.render('main', { content: 'tasks', tasks: tasks });
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
