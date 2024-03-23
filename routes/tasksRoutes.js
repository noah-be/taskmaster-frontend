import express from 'express';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

// POST: Create a new task
router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const newTask = new Task({
            title: req.body.title,
            priority: req.body.priority,
            done: req.body.done
        });

        await newTask.save();

        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET: Read all tasks
router.get('/', authenticateToken, async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status(500).send();
    }
});

// GET: Read a single task by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});

// PATCH: Update a task
router.patch('/api/tasks/:taskId', authenticateToken, async (req, res) => {
    const updates = req.body; // This could include any combination of updatable fields
    const taskId = req.params.taskId;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }

        Object.keys(updates).forEach(update => {
            task[update] = updates[update];
        });

        await task.save();
        res.json({ success: true, task });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
});


// DELETE: Delete a task
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});

export default router;
