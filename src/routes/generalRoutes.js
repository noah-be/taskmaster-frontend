import express from 'express';
import authenticateToken from '../middlewares/authTokenMiddleware.js';
import {
    renderMainWithContent
} from '../utils/renderUtils.js';
import fetchTasks from '../middlewares/fetchTasksMiddleware.js';

const router = express.Router();



router.get('/', renderMainWithContent('home'));
router.get('/about', renderMainWithContent('about'));
router.get('/contact', renderMainWithContent('contact'));
router.get('/tasks', authenticateToken, fetchTasks, renderMainWithContent('tasks'));

export default router;