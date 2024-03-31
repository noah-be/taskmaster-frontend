import TaskModel from "../models/TaskModel";

async function fetchTasks(req, res, next) {
    try {
        const tasks = await Task.find({
            user: req.user._id
        });
        req.tasks = tasks;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

export default fetchTasks;