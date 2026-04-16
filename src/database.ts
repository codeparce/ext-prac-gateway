import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Service } from "./entities/Service";

dotenv.config();

const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

if (!host || !username || !password || !database) {
  throw new Error("Missing required database environment variables");
}

export const AppDataSource = new DataSource({
  type: "postgres",
  host,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username,
  password,
  database,
  synchronize: true,
  logging: false,
  entities: [Service],
  migrations: [],
  subscribers: [],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});