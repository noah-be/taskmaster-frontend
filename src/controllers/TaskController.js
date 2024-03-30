import Task from '../models/TaskModel.js';

const TaskController = {
    getTaskTable: async (req, res) => {
        try {
            const tasks = await Task.find({
                user: req.user._id
            });
            res.render('_todo-table', {
                tasks: tasks
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    async addTask(req, res) {
        console.log("Request body:", req.body);
        try {
            const {
                title,
                priority
            } = req.body;

            if (!title) {
                return res.status(400).json({
                    error: 'Title is required'
                });
            }
            if (!['High', 'Medium', 'Low'].includes(priority)) {
                return res.status(400).json({
                    error: 'Invalid priority value'
                });
            }

            const description = req.body.description || "Default description";
            const dueDate = req.body.dueDate ? new Date(req.body.dueDate) : new Date();

            if (!req.user || !req.user._id) {
                console.log("User identification missing");
                return res.status(400).json({
                    error: 'User identification is missing'
                });
            }


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
            res.status(500).send(`Internal Server Error: ${error.message}`);
        }
    },
    async getAllTasks(req, res) {
        try {
            const userTasks = await Task.find({
                user: req.user._id
            });
            res.render('main-layout', {
                content: 'tasks',
                tasks: userTasks
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    async getTaskById(req, res) {
        try {
            const task = await Task.findOne({
                _id: req.params.taskId,
                user: req.user._id
            });
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
            const updatedTask = await Task.findOneAndUpdate({
                    _id: req.params.taskId,
                    user: req.user._id
                },
                req.body, {
                    new: true
                }
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
            const deletedTask = await Task.findOneAndDelete({
                _id: req.params.taskId,
                user: req.user._id
            });
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