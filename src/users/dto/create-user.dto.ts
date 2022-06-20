import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../enums/roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role: Role;
}
