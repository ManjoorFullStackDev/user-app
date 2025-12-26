import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { AppDataSource } from "./ormConfig.js";
import express from "express";
import userRoutes from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
