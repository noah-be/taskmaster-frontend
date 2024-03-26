import express from 'express';
import authenticateToken from '../middlewares/authenticateToken.js';
import TaskController from '../controllers/TaskController.js';


const router = express.Router();

router.post('/', authenticateToken, TaskController.addTask);
router.get('/', authenticateToken, TaskController.getAllTasks);
router.get('/:taskId', authenticateToken, TaskController.getTaskById);
router.patch('/:taskId', authenticateToken, TaskController.updateTask);
router.delete('/:taskId', authenticateToken, TaskController.deleteTask);


export default router;
