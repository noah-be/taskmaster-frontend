import app from './app.js';

const port = process.env.PORT || 3009;
let server;


export function startServer() {
    server = app.listen(port, () => {
        const serverDomain = process.env.SERVER_DOMAIN || 'localhost';

        const currentTime = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        console.log(`[${currentTime}] \x1b[94m\x1b[1m[Server]\x1b[0m \x1b[94mhttp://${serverDomain}:${port} 🚀\x1b[0m`);
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
