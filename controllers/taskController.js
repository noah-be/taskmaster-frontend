import * as todoModel from '../models/todoModel.js';

async function getTasks(req, res) {
    try {
        const tasks = await todoModel.readTodos();
        res.render('main', { content: 'tasks', tasks });
    } catch (err) {
        console.error('Error fetching tasks', err);
        res.status(500).send('Error fetching tasks');
    }
}

async function addTask(req, res) {
    try {
        const newTask = req.body;
        const tasks = await todoModel.readTodos();

        tasks.push(newTask);
        await todoModel.writeTodos(tasks);

        res.json({ task: newTask, index: tasks.length - 1 });
    } catch (error) {
        console.error('Error adding task', error);
        res.status(500).send('Failed to add task');
    }
}

async function toggleTask(req, res) {
    try {
        const { index, done } = req.body;
        const tasks = await todoModel.readTodos();

        if (tasks[index]) {
            tasks[index].done = done;
            await todoModel.writeTodos(tasks);
            res.json({ success: true, task: tasks[index] });
        } else {
            res.status(404).send('Task not found');
        }
    } catch (error) {
        console.error('Error toggling task', error);
        res.status(500).send('Failed to toggle task');
    }
}

export { getTasks, addTask, toggleTask };
