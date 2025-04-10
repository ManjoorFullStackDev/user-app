import { AppDataSource } from "../ormConfig";
import express from "express";
import userRoutes from "./routes/userRoute";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
app.listen(3000, ()=>console.log('server is running on port 3000'))