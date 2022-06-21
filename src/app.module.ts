import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { IssuesModule } from './issues/issues.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { Issue } from './issues/entities/issue.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'backend',
      // entities: [User, Issue],
      autoLoadEntities: true,
      // entities: [__dirname + '/../**/*.entity.ts'],
      synchronize: true,
    }),
    UsersModule,
    IssuesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
