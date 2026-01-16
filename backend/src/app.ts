import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
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
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
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
