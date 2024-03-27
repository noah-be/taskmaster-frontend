const cspMiddleware = (req, res, next) => {
    res.setHeader("Content-Security-Policy", "script-src 'nonce-source' http://localhost:3009 https://accounts.google.com https://apis.google.com");
    next();
};

export default cspMiddleware;