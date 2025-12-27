import "./env";
import "reflect-metadata";

import express from "express";
import cookieParser from "cookie-parser";
import { AppDataSource } from "./ormConfig";
import userRoutes from "./routes/userRoute";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRoutes);

AppDataSource.initialize()
  .then(() => console.log("✅ DB connected"))
  .catch((err) => console.error("❌ DB error", err));

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
