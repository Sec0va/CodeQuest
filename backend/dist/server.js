"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./utils/logger"));
const data_source_1 = require("./data-source");
const PORT = process.env.PORT || 8080;
const MAX_DB_INIT_ATTEMPTS = Number(process.env.DB_INIT_MAX_ATTEMPTS || 10);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const initializeDataSource = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!data_source_1.databaseUrl) {
        throw new Error('Database URL is not set. Expected one of: DATABASE_URL, DATABASE_PUBLIC_URL, POSTGRES_URL, POSTGRESQL_URL');
    }
    for (let attempt = 1; attempt <= MAX_DB_INIT_ATTEMPTS; attempt += 1) {
        if (data_source_1.AppDataSource.isInitialized) {
            return;
        }
        try {
            yield data_source_1.AppDataSource.initialize();
            logger_1.default.info("Data Source has been initialized!");
            return;
        }
        catch (err) {
            const retryDelayMs = Math.min(30000, attempt * 5000);
            logger_1.default.error(`Error during Data Source initialization (attempt ${attempt}/${MAX_DB_INIT_ATTEMPTS}). Retrying in ${retryDelayMs}ms:`, err);
            if (attempt === MAX_DB_INIT_ATTEMPTS) {
                throw err;
            }
            yield sleep(retryDelayMs);
        }
    }
});
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield initializeDataSource();
        app_1.default.listen(PORT, () => {
            logger_1.default.info(`Server is running on port ${PORT}`);
        });
    }
    catch (err) {
        logger_1.default.error('Unable to start server because database initialization failed:', err);
        process.exit(1);
    }
});
void bootstrap();
