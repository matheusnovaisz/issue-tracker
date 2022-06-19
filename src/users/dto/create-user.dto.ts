import { IsEnum, IsNotEmpty } from 'class-validator';
import { Roles } from '../enums/roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(Roles)
  role: Roles;
}
