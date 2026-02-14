"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseUrl = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./models/User");
const Contest_1 = require("./models/Contest");
const ContestResult_1 = require("./models/ContestResult");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const resolveDatabaseUrl = () => process.env.DATABASE_URL ||
    process.env.DATABASE_PUBLIC_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRESQL_URL;
const databaseUrl = resolveDatabaseUrl();
exports.databaseUrl = databaseUrl;
const isProduction = process.env.NODE_ENV === "production";
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: databaseUrl,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
    synchronize: true,
    logging: false,
    entities: [User_1.User, Contest_1.Contest, ContestResult_1.ContestResult],
    subscribers: [],
    migrations: [],
});
