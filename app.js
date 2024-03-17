import express from 'express';
import { promises as fs } from 'fs';

const app = express();

async function readTodos() {
    try {
        const data = await fs.readFile('todos.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file', err);
        return [];
    }
}

async function writeTodos(todos) {
    try {
        await fs.writeFile('todos.json', JSON.stringify(todos, null, 2));
    } catch (err) {
        console.error('Error writing to file', err);
        throw err;
    }
}

app.set('view engine', 'ejs');
app.set('etag', 'strong');

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('main', { main: 'main' });
});

app.use('/coverage', express.static('coverage'));


app.get('/tasks', async (req, res) => {
    try {
        const tasks = await readTodos();
        res.render('main', { main: 'tasks', tasks: tasks });
    } catch (err) {
        console.error('Error fetching tasks', err);
        res.status(500).send('Error fetching tasks');
    }
});

app.get('/about', (req, res) => {
    res.render('main', { main: 'about' });
});

app.get('/contact', (req, res) => {
    res.render('main', { main: 'contact' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    res.send(`Received username: ${username} and password: ${password}`);
});

app.post('/add-task', async (req, res) => {
    try {
        const newTask = req.body;
        const tasks = await readTodos();

        tasks.push(newTask);
        await writeTodos(tasks);

        res.json({ task: newTask, index: tasks.length - 1 });
    } catch (error) {
        console.error('Error adding task', error);
        res.status(500).send('Failed to add task');
    }
});

app.post('/toggle-task', async (req, res) => {
    try {
        const { index, done } = req.body;
        const tasks = await readTodos();

        if (tasks[index]) {
            tasks[index].done = done;
            await writeTodos(tasks);
            res.json({ success: true, task: tasks[index] });
        } else {
            res.status(404).send('Task not found');
        }
    } catch (error) {
        console.error('Error toggling task', error);
        res.status(500).send('Failed to toggle task');
    }
});

app.get('/users/:userId/tasks/:taskId', (req, res) => {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    res.send(`Hello User ${userId} you chose the task ${taskId}`);
});

app.use((req, res) => {
    res.status(404).render('main', { title: 'Page not found', main: '404' });
});

export default app;