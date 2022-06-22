import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { Priority } from '../enums/priority.enum';
import { Status } from '../enums/status.enum';

export class CreateIssueDto {
  @IsNotEmpty()
  title: string;

  description: string;

  @IsEnum(Status)
  status: Status;

  @IsEnum(Priority)
  priority: Priority;

  @IsInt()
  assigneeId: number;
}
