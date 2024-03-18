import express from 'express';
import * as taskController from '../controllers/taskController.js';

const router = express.Router();

router.get('/', taskController.getTasks);
router.post('/add-task', taskController.addTask);
router.post('/toggle-task', taskController.toggleTask);

export default router;