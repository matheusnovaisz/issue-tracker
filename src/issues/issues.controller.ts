import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/roles.enum';
import { RoleGuard } from 'src/users/guards/roles.guard';

@UseGuards(JwtAuthGuard)
@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @Roles(Role.QA, Role.SCRUM_MASTER)
  @UseGuards(RoleGuard)
  create(@Body() createIssueDto: CreateIssueDto, @Request() request) {
    return this.issuesService.create(createIssueDto, request.user);
  }

  @Get()
  findAll() {
    return this.issuesService.findAll();
  }

  @Roles(Role.SCRUM_MASTER)
  @UseGuards(RoleGuard)
  @Delete()
  bulkRemove(@Request() request) {
    const { issues } = request.body;
    if (!issues) {
      throw new BadRequestException('Inform the issues id');
    }
    return this.issuesService.bulkRemove(issues);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.issuesService.findById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIssueDto: UpdateIssueDto,
    @Request() request,
  ) {
    return this.issuesService.update(+id, updateIssueDto);
  }

  @Roles(Role.SCRUM_MASTER)
  @UseGuards(RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.issuesService.remove(+id);
  }
}
