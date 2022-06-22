import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Issue } from 'src/issues/entities/issue.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../enums/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  username: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hash() {
    this.password = await hash(this.password, 10);
  }

  @Exclude()
  @Column()
  @IsNotEmpty()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.DEVELOPER,
  })
  role: Role;

  @OneToMany(() => Issue, (issue) => issue.author, { eager: false })
  issues: Issue[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
