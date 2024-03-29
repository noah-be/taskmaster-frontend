import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import {
    fileURLToPath
} from 'url';

import routes from './src/routes/index.js';
import mdws from './src/middlewares/index.js';
import dbConnect from './config/dbConnect.js';

import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3009;

const viewsDirectories = [
    path.join(__dirname, 'views/layouts'),
    path.join(__dirname, 'views/pages'),
    path.join(__dirname, 'views/partials')
];

process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('etag', 'strong');
app.set('views', viewsDirectories);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/auth', routes.authRoutes);
app.use('/api/task', routes.taskRoutes);
app.use('/', routes.generalRoutes);
app.use(mdws.notFoundMiddleware);

dbConnect();

app.listen(port, function () {
    const serverDomain = process.env.SERVER_DOMAIN || 'localhost';
    const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    console.log(
        `[${currentTime}] \x1b[94m\x1b[1m[Server]\x1b[0m \x1b[94mhttp://${serverDomain}:${port} 🚀\x1b[0m`);
});

export default app;