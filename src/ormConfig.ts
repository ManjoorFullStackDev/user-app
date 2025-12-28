import { DataSource } from "typeorm";
import { User } from "./Entity/userEntity";
import { Task } from "./Entity/taskEntity";
import { env } from "./env";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,



  extra: {
    connectTimeout: 20000,
  },

  synchronize: true,
  logging: true,
  entities: [User, Task],
});
