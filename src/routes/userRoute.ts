import { Router } from "express";
import {
  loginUser,
  registerUser,
  getTasks,
  downloadUsers,
} from "../api/userApi.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
const router = Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/tasks", authenticateToken, getTasks);
router.get("/download", authenticateToken, downloadUsers);
export default router;
