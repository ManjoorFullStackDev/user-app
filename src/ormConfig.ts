  import { DataSource } from "typeorm";
  import { User } from "./Entity/userEntity";
  import { Task } from "./Entity/taskEntity";
  import dotenv from "dotenv";
  dotenv.config();

  export const AppDataSource = new DataSource({
    type: "mssql",
    host: process.env.DB_HOST,
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
