import { DataSource } from "typeorm";
import { User } from "./Entity/userEntity";
import { Task } from "./Entity/taskEntity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
    ssl: {
    rejectUnauthorized: false,
  },

  extra: {
    connectTimeout: 20000,
  },

  synchronize: true,
  logging: true,
  entities: [User, Task],
});
