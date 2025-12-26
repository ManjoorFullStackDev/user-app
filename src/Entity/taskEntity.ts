import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./userEntity.js";


@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "nvarchar", length: 255 })
  description: string;

  @Column({ type: "bit", default: false })
  completed: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}

