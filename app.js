import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import routes from './src/routes/index.js';
import mdws from './src/middlewares/index.js';
import dbConnect from './config/dbConnect.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3009;

app.set('view engine', 'ejs');
app.set('etag', 'strong');


app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "script-src 'nonce-source' http://localhost:3009 https://accounts.google.com https://apis.google.com");
    next();
});

process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/api/auth', routes.authRoutes);
app.use('/api/task', routes.taskRoutes);
app.use('/', routes.generalRoutes);
app.use(mdws.handle404);




dbConnect();


app.listen(port, function () {

    const serverDomain = process.env.SERVER_DOMAIN || 'localhost';

    const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    console.log(`[${currentTime}] \x1b[94m\x1b[1m[Server]\x1b[0m \x1b[94mhttp://${serverDomain}:${port} 🚀\x1b[0m`);

});






export default app;
