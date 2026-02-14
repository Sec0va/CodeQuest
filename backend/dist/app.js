"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("./utils/logger"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        const allowedOrigins = process.env.CORS_ORIGIN
            ? process.env.CORS_ORIGIN.split(',')
            : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'];
        this.app.use((0, cors_1.default)({
            origin: allowedOrigins,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Key']
        }));
        this.app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms', {
            stream: {
                write: (message) => logger_1.default.http(message.trim()),
            },
        }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(express_1.default.json({ limit: '5mb' }));
        this.app.use(express_1.default.urlencoded({ extended: false, limit: '5mb' }));
    }
    routes() {
        this.app.use('/api', routes_1.default);
        const frontDistPath = path_1.default.resolve(__dirname, '../../front/dist');
        const frontIndexPath = path_1.default.join(frontDistPath, 'index.html');
        const hasFrontendBuild = fs_1.default.existsSync(frontIndexPath);
        if (hasFrontendBuild) {
            this.app.use(express_1.default.static(frontDistPath));
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
exports.default = new App().app;
