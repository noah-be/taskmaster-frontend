import Task from '../models/Task.js';

const TaskController = {
    async addTask(req, res) {
        try {
            const { title, priority } = req.body;

            const description = "Default description";
            const dueDate = new Date();

            const newTask = new Task({
                title: title,
                description: description,
                dueDate: dueDate,
                priority: priority,
                completed: false,
                user: req.user._id
            });

            await newTask.save();

            res.status(201).json(newTask);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    async getAllTasks(req, res) {
        try {
            const userTasks = await Task.find({ user: req.user._id });
            res.render('main', { content: 'tasks', tasks: userTasks });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    async getTaskById(req, res) {
        try {
            const task = await Task.findOne({ _id: req.params.taskId, user: req.user._id });
            if (!task) {
                return res.status(404).send('Task not found');
            }
            res.json(task);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    async updateTask(req, res) {
        try {
            const updatedTask = await Task.findOneAndUpdate(
                { _id: req.params.taskId, user: req.user._id },
                req.body,
                { new: true }
            );
            if (!updatedTask) {
                return res.status(404).send('Task not found');
            }
            res.json(updatedTask);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    async deleteTask(req, res) {
        try {
            const deletedTask = await Task.findOneAndDelete({ _id: req.params.taskId, user: req.user._id });
            if (!deletedTask) {
                return res.status(404).send('Task not found');
            }
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
};

export default TaskController;
