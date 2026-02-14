import "reflect-metadata";
import app from './app';
import Logger from './utils/logger';
import {AppDataSource} from "./data-source";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    Logger.info(`Server is running on port ${PORT}`);
});

const initializeDataSource = async (attempt = 1): Promise<void> => {
    if (AppDataSource.isInitialized) {
        return;
    }

    try {
        await AppDataSource.initialize();
        Logger.info("Data Source has been initialized!");
    } catch (err) {
        const retryDelayMs = Math.min(30000, attempt * 5000);
        Logger.error(
            `Error during Data Source initialization (attempt ${attempt}). Retrying in ${retryDelayMs}ms:`,
            err
        );
        setTimeout(() => {
            void initializeDataSource(attempt + 1);
        }, retryDelayMs);
    }
};

void initializeDataSource();
