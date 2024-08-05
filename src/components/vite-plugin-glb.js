import mime from 'mime';
import express from 'express';

export default function glbPlugin() {
    return {
        name: 'vite-plugin-glb',
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                if (req.url.endsWith('.glb')) {
                    res.setHeader('Content-Type', mime.getType('glb'));
                }
                next();
            });
        }
    };
}