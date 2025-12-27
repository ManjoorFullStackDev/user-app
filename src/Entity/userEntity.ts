import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "./taskEntity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "nvarchar", length: 100 })
  username!: string;

  @Column({ type: "nvarchar", length: 150 })
  email!: string;

  @Column({ type: "nvarchar", length: 255 })
  password!: string;

  // ✅ One user → many tasks
  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];

  @CreateDateColumn()
  createdAt!: Date;
}
