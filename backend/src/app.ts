import express, {Application} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
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
            allowedHeaders: ['Content-Type', 'Authorization']
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
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    private routes(): void {
        this.app.use('/api', apiRoutes);

        // Root route
        this.app.get('/', (req, res) => {
            res.send('CodeQuest API is running');
        });
    }
}

export default new App().app;
