"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./utils/logger"));
const data_source_1 = require("./data-source");
const PORT = process.env.PORT || 8080;
data_source_1.AppDataSource.initialize()
    .then(() => {
    logger_1.default.info("Data Source has been initialized!");
    app_1.default.listen(PORT, () => {
        logger_1.default.info(`Server is running on port ${PORT}`);
    });
})
    .catch((err) => {
    logger_1.default.error("Error during Data Source initialization:", err);
});
