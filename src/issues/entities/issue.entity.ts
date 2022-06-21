import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Priority } from '../enums/priority.enum';
import { Status } from '../enums/status.enum';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @VersionColumn()
  version: number;

  @Column('text')
  description: string;

  @ManyToOne(() => User, (user) => user.issues, { eager: true })
  author: User;

  @ManyToOne(() => User, (user) => user.issues, { eager: true })
  assignee: User;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NEW,
  })
  status: Status;

  @Column({
    type: 'enum',
    enum: Priority,
    default: Priority.NORMAL,
  })
  priority: Priority;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
