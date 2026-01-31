import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Contest } from "./models/Contest";
import dotenv from "dotenv";
dotenv.config();
export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: [User, Contest],
    subscribers: [],
    migrations: [],
});
