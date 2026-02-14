import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Contest } from "./models/Contest";
import { ContestResult } from "./models/ContestResult";
import dotenv from "dotenv";
dotenv.config();

const resolveDatabaseUrl = (): string | undefined =>
    process.env.DATABASE_URL ||
    process.env.DATABASE_PUBLIC_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRESQL_URL;

const databaseUrl = resolveDatabaseUrl();
const isProduction = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: databaseUrl,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
    synchronize: true,
    logging: false,
    entities: [User, Contest, ContestResult],
    subscribers: [],
    migrations: [],
});

export { databaseUrl };
