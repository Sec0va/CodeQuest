import "reflect-metadata";
import app from './app';
import Logger from './utils/logger';
import {AppDataSource} from "./data-source";

const PORT = process.env.PORT || 8080;

AppDataSource.initialize()
    .then(() => {
        Logger.info("Data Source has been initialized!");
        app.listen(PORT, () => {
            Logger.info(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        Logger.error("Error during Data Source initialization:", err);
    });
