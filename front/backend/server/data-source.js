import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DataSource } from 'typeorm';
import { UserSchema } from './entities/User.js';
import { RoleSchema } from './entities/Role.js';
import { UserRoleSchema } from './entities/UserRole.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '..', 'db', 'codequest.db');

const isProduction = process.env.NODE_ENV === 'production';
const useDatabaseUrl = Boolean(process.env.DATABASE_URL);
const sslEnabled = useDatabaseUrl && (process.env.DB_SSL ? process.env.DB_SSL === 'true' : isProduction);

export const dataSource = new DataSource({
  type: useDatabaseUrl ? 'postgres' : 'better-sqlite3',
  url: useDatabaseUrl ? process.env.DATABASE_URL : undefined,
  database: useDatabaseUrl ? undefined : dbPath,
  synchronize: true,
  logging: false,
  entities: [UserSchema, RoleSchema, UserRoleSchema],
  ...(useDatabaseUrl && sslEnabled ? { ssl: { rejectUnauthorized: false } } : {})
});
