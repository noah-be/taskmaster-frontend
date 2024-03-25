import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import('dotenv').then((dotenv) => dotenv.config());


const app = express();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todoApp';

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err))

app.set('view engine', 'ejs');
app.set('etag', 'strong');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/api/task', routes.taskRoutes);
app.use('/api/auth', routes.authRoutes);
app.use('/', routes.generalRoutes);


app.use((req, res) => {
    res.status(404).render('main', { content: '404' });
});

export default app;
