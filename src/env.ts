import dotenv from "dotenv";

dotenv.config();

if (!process.env.DB_HOST) {
  throw new Error("Environment variables not loaded");
}
