import express from 'express';
const router = express.Router();

router.get('/:userId/tasks/:taskId', (req, res) => {
    const { userId, taskId } = req.params;
    res.send(`Hello User ${userId}, you chose the task ${taskId}`);
});

export default router;
