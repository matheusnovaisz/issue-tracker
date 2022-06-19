import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../enums/roles.enum';

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
    enum: Roles,
    default: Roles.DEVELOPER,
  })
  role: Roles;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
