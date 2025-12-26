import { Router } from "express";
import {
  loginUser,
  registerUser,
  getTasks,
  downloadUsers,
} from "../api/userApi";
import { authenticateToken } from "../middleware/auth.middleware";
const router = Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/tasks", authenticateToken, getTasks);
router.get("/download", authenticateToken, downloadUsers);
export default router;
