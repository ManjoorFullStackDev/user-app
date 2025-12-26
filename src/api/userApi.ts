import { Request, Response } from "express";
import { AppDataSource } from "../ormConfig.js";
import { User } from "../Entity/userEntity.js";
import { Task } from "../Entity/taskEntity.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ExcelJs from "exceljs";
import {
  RegisterUserInput,
  LoginUserInput,
  TokenResponse,
  TaskResponse,
  UserRow,
} from "./types.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_Key = process.env.JWT_SECRET as string;

export const registerUser = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response<{ message: string }>
): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ email });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({
      email,
      username,
      password: hashedPassword,
    });
    await userRepository.save(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response<TokenResponse | { message: string }>
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token: string = jwt.sign(
      { id: user.id, email: user.email },
      JWT_Key,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Error logging in user", error);
    res.status(500).json({ message: "Intrenal server error" });
  }
};

export const getTasks = async (
  req: Request<{}, {}, {}, { completed?: string }>,
  res: Response<TaskResponse | { message: string }>
): Promise<void> => {
  const completed = req.query.completed;

  try {
    const taskRepository = AppDataSource.getRepository(Task);
    let taskData: Task[];

    if (completed === "true") {
      taskData = await taskRepository.find({ where: { completed: true } });
    } else if (completed === "false") {
      taskData = await taskRepository.find({ where: { completed: false } });
    } else {
      taskData = await taskRepository.find();
    }

    res.json({ taskData });
  } catch (err) {
    console.error("Eror fetching tasks", err);
    res.status(500).json({ message: "error in fetching tasks" });
  }
};

export const downloadUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const users: User[] = await userRepo.find();

    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Username", key: "username", width: 20 },
      { header: "Email", key: "email", width: 30 },
    ];

    users.forEach((user: User) => {
      const row: UserRow = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
      worksheet.addRow(row);
    });

    res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Error downoading users", err);
    res.status(500).json({ message: "error in downloading users" });
  }
};
