import { Task } from "../Entity/taskEntity";

export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface TokenResponse {
  token: string;
  message: string;
}

export interface TaskResponse {
  taskData: Task[];
}

export interface UserRow {
  id: string;
  username: string;
  email: string;
}
