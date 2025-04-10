import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./userEntity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column({default: false})
    completed: boolean;

    @ManyToOne(() => User, (user) => user.tasks)
    user: User;
}