import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from './utils/env.js';


const PORT = Number(env('PORT', '3000'));

export const startServer = () => {

    const app = express();

    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        })
    )


    app.use((req, res, next) => {
        console.log(`Time: ${new Date().toLocaleString()}`);
        next();
    });

    app.use(express.json());

    app.get('/', (req, res) => {
        res.json({ message: 'Hello, Nanny Services!' });
    })

    app.use((err, req, res, next) => {
        res.status(500).json({
            message: 'Something went wrong'
        });
        next();
    });

    app.use('*', (req, res, next) => {
        res.status(404).json({
            message: 'Page not found',
        })
    })

    app.use((err, req, res, next) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message,
        })
    })

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })

}
