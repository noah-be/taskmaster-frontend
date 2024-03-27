import express from 'express';
import Task from '../models/TaskModel.js'
import TaskController from '../controllers/TaskController.js';
import authenticateToken from '../middlewares/authTokenMiddleware.js';

const router = express.Router();

const renderMainWithContent = (content) => (req, res) => {
    res.render('main', { content });
};

router.get('/', renderMainWithContent('home'));
router.get('/about', renderMainWithContent('about'));
router.get('/contact', renderMainWithContent('contact'));

router.get('/tasks', authenticateToken, async (req, res) => {
    try {
        await TaskController.getAllTasks(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
