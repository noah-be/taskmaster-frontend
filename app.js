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
