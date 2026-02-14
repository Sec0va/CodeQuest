import "reflect-metadata";
import app from './app';
import Logger from './utils/logger';
import {AppDataSource} from "./data-source";

const PORT = process.env.PORT || 8080;
const MAX_DB_INIT_ATTEMPTS = Number(process.env.DB_INIT_MAX_ATTEMPTS || 10);

const sleep = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

const initializeDataSource = async (): Promise<void> => {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not set');
    }

    for (let attempt = 1; attempt <= MAX_DB_INIT_ATTEMPTS; attempt += 1) {
        if (AppDataSource.isInitialized) {
            return;
        }

        try {
            await AppDataSource.initialize();
            Logger.info("Data Source has been initialized!");
            return;
        } catch (err) {
            const retryDelayMs = Math.min(30000, attempt * 5000);
            Logger.error(
                `Error during Data Source initialization (attempt ${attempt}/${MAX_DB_INIT_ATTEMPTS}). Retrying in ${retryDelayMs}ms:`,
                err
            );

            if (attempt === MAX_DB_INIT_ATTEMPTS) {
                throw err;
            }

            await sleep(retryDelayMs);
        }
    }
};

const bootstrap = async (): Promise<void> => {
    try {
        await initializeDataSource();
        app.listen(PORT, () => {
            Logger.info(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        Logger.error('Unable to start server because database initialization failed:', err);
        process.exit(1);
    }
};

void bootstrap();
