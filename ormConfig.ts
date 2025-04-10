import { DataSource } from "typeorm";
import { User } from "./src/Entity/userEntity.ts";
import { Task } from "./src/Entity/taskEntity.ts";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mssql",
  host: "localhost",
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Task],
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
});
