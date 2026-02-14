import express, {Application} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import Logger from './utils/logger';
import apiRoutes from './routes';

dotenv.config();

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        const allowedOrigins = process.env.CORS_ORIGIN
            ? process.env.CORS_ORIGIN.split(',')
            : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'];

        this.app.use(cors({
            origin: allowedOrigins,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Key']
        }));

        this.app.use(morgan(
            ':method :url :status :res[content-length] - :response-time ms',
            {
                stream: {
                    write: (message) => Logger.http(message.trim()),
                },
            }
        ));

        this.app.use(cookieParser());
        this.app.use(express.json({limit: '5mb'}));
        this.app.use(express.urlencoded({extended: false, limit: '5mb'}));
    }

    private routes(): void {
        this.app.use('/api', apiRoutes);

        const frontDistPath = path.resolve(__dirname, '../../front/dist');
        const frontIndexPath = path.join(frontDistPath, 'index.html');
        const hasFrontendBuild = fs.existsSync(frontIndexPath);

        if (hasFrontendBuild) {
            this.app.use(express.static(frontDistPath));
            this.app.get(/^\/(?!api).*/, (_req, res) => {
                res.sendFile(frontIndexPath);
            });
            return;
        }

        this.app.get('/', (_req, res) => {
            res.send('CodeQuest API is running. Frontend build not found.');
        });
    }
}

export default new App().app;
