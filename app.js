import express from 'express';

const app = express();

app.set('view engine', 'ejs');
app.set('etag', 'strong');

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('main', { main: 'home' });
});

app.get('/about', (req, res) => {
    res.render('main', { main: 'about' });
});

app.get('/contact', (req, res) => {
    res.render('main', { main: 'contact' });
});



const tasks = [
    { task: "Complete project report", date: "2024-03-15 09:00", priority: "high", done: false },
    { task: "Call client for follow-up", date: "2024-03-15 11:30", priority: "normal", done: true },
    { task: "Review presentation slides", date: "2024-03-16 14:00", priority: "low", done: false },
    { task: "Send out meeting invites", date: "2024-03-17 10:00", priority: "normal", done: false },
    { task: "Prepare for team meeting", date: "2024-03-17 15:00", priority: "high", done: false }
];



app.get('/tasks', (req, res) => {
    res.render('main', { main: 'tasks', tasks: tasks });
});



app.post('/login', (req, res) => {
    const { username, password } = req.body;
    res.send(`Received username: ${username} and password: ${password}`);
});

app.get('/users/:userId/tasks/:taskId', (req, res) => {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    res.send(`Hello User ${userId} you chose the task ${taskId}`);
});

app.use((req, res) => {
    res.status(404).render('main', { title: 'Page not found', main: '404' });
});

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
