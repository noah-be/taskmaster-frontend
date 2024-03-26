import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import routes from './routes/index.js';
import handle404 from './middlewares/handle404.js';
import('dotenv').then((dotenv) => dotenv.config());


const app = express();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todoApp';

mongoose.connect(mongoURI)
    .then(() => {
        const currentTime = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        console.log(`[${currentTime}] \x1b[92m\x1b[1m[MongoDB]\x1b[0m ✅`);
    })
    .catch(err => console.error('Could not connect to MongoDB:', err));

app.set('view engine', 'ejs');
app.set('etag', 'strong');

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/api/task', routes.taskRoutes);
app.use('/api/auth', routes.authRoutes);
app.use('/', routes.generalRoutes);
app.use(handle404);

export default app;
