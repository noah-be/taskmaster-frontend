import app from './app.js';

const port = process.env.PORT || 3009;
let server;


export function startServer() {
    server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
    return server;
}


export function stopServer() {
    if (server) {
        server.close(() => {
            console.log('Server stopped');
        });
    }
}
