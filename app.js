import express from 'express';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import generalRoutes from './routes/generalRoutes.js';

const app = express();


const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todoApp';

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err))



app.set('view engine', 'ejs');
app.set('etag', 'strong');
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use('/', generalRoutes);


app.use((req, res) => {
    res.status(404).render('main', { content: '404' });
});

export default app;
