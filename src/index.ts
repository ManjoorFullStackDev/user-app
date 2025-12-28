import "./env";
import "reflect-metadata";
import { AppDataSource } from "./ormConfig";
import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoute";
import { env } from "./env";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected");
  })
  .catch((err) => {
    console.error("❌ Database connection failed", err);
    process.exit(1); // HARD FAIL (important)
  });

app.listen(env.PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${env.PORT}`);
});
