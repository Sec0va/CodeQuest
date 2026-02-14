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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusController = void 0;
const data_source_1 = require("../data-source");
class StatusController {
    constructor() {
        this.getStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const version = process.env.APP_VERSION ||
                process.env.npm_package_version ||
                '0.1';
            let database = 'down';
            if (data_source_1.AppDataSource.isInitialized) {
                try {
                    yield data_source_1.AppDataSource.query('SELECT 1');
                    database = 'ok';
                }
                catch (error) {
                    database = 'down';
                }
            }
            res.status(200).json({
                api: 'ok',
                database,
                version,
                timestamp: new Date().toISOString(),
            });
        });
    }
}
exports.StatusController = StatusController;
