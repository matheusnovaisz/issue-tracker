import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository, In } from 'typeorm';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { Issue as IssueEntity } from './entities/issue.entity';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(IssueEntity)
    private issueRepository: Repository<IssueEntity>,
    private usersService: UsersService,
  ) {}
  async create(createIssueDto: CreateIssueDto, user: UserEntity) {
    try {
      const assignee = createIssueDto.assigneeId
        ? await this.usersService.findById(createIssueDto.assigneeId)
        : null;
      const issue = this.issueRepository.create({
        ...createIssueDto,
        author: user,
        assignee,
      });
      await this.issueRepository.save(issue);
      return issue;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return this.issueRepository.find();
  }

  async findById(id: number) {
    try {
      const issue = await this.issueRepository.findOne({ where: { id } });
      if (!issue) {
        throw new NotFoundException();
      }
      return issue;
    } catch (error) {
      if (error) throw error;
      throw new BadRequestException();
    }
  }

  async update(id: number, updateIssueDto: UpdateIssueDto) {
    try {
      const assignee = updateIssueDto.assigneeId
        ? await this.usersService.findById(updateIssueDto.assigneeId)
        : null;
      const issue = await this.issueRepository.findOneOrFail({ where: { id } });
      return this.issueRepository.save({
        ...issue,
        ...updateIssueDto,
        assignee,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const issue = await this.findById(id);
      await this.issueRepository.delete(id);
      return issue;
    } catch (error) {
      if (error) throw error;
      throw new BadRequestException();
    }
  }

  async bulkRemove(ids: Array<number>) {
    try {
      const issues = await this.issueRepository.find({
        where: { id: In(ids) },
      });
      await this.issueRepository.delete(ids);
      return issues;
    } catch (error) {
      throw error;
    }
  }
}
