import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express';
import { Options } from 'http-proxy-middleware';


interface ProxyOptions extends Options {
    target: string;
    changeOrigin: boolean;
}

export default function setupProxy(app: Application): void {
    const proxyOptions: ProxyOptions = {
        target: process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'http://localhost:3001',
        changeOrigin: true,
    };

    app.use(
        '/api',
        createProxyMiddleware(proxyOptions)
    );
}