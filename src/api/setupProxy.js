const { createProxyMiddleware } = require('http-proxy-middleware');

const target = process.env.NODE_ENV === 'production' ? 'https://your-production-url.com' : 'http://localhost:3001';

module.exports = function (app) {
    app.use(
        '/api/',
        createProxyMiddleware({
            target: target,
            changeOrigin: true,
        })
    );
};