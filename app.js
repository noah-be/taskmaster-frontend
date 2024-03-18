import express from 'express';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import generalRoutes from './routes/generalRoutes.js';

const app = express();

app.set('view engine', 'ejs');
app.set('etag', 'strong');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', generalRoutes);
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

app.use('/coverage', express.static('coverage'));

app.use((req, res) => {
    res.status(404).render('main', { content: '404' });
});

export default app;
