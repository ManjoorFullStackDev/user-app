import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const JWT_Key = "manjoor5678";

//Auth Middleware
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req?.cookies.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No Token provided, please login" });
    }
    const decoded = jwt.verify(token, JWT_Key);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: `${err}:Invalid or expired token` });
  }
};
