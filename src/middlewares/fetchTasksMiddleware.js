import Task from '../models/TaskModel.js'
import moment from 'moment';

async function fetchTasks(req, res, next) {
    try {
        const tasks = await Task.find({
            user: req.user._id
        });
        req.tasks = tasks;

        tasks.forEach(task => {
            task.formattedDueDate = moment(task.dueDate).format('MM/DD/YYYY');
        });

        next();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

export default fetchTasks;