import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use(express.static("public"))

// middleware to parse incoming requests with form data
app.use(bodyParser.urlencoded({ extended: true }));


// route handler for receiving login data
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // show the received data
    res.send(`Received username: ${username} and password: ${password}`);
});

// dynamic route handler
app.get('/users/:userId/tasks/:taskId', (request, response) => {
    const userId = request.params.userId
    const taskId = request.params.taskId
    response.send(`Hello User ${userId} you choose the task ${taskId}`)
})


// route handler for 404 errors
app.use((req, res, next) => {
    res.status(404).sendFile('public/404.html', { root: process.cwd() });
});



app.listen(3000)