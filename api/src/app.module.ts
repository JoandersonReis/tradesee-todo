import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { DocumentController } from './models/Document/document.controller';
import { DocumentRepository } from './models/Document/document.repository';
import { DocumentService } from './models/Document/document.service';
import { TaskController } from './models/Task/task.controller';
import { TaskRepository } from './models/Task/task.repository';
import { TaskService } from './models/Task/task.service';
import { UserController } from './models/User/user.controller';
import { UserRepository } from './models/User/user.repository';
import { UserService } from './models/User/user.service';

@Module({
  imports: [],
  controllers: [UserController, DocumentController, TaskController],
  providers: [
    UserService,
    UserRepository,
    DocumentService,
    DocumentRepository,
    TaskService,
    TaskRepository,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: '/users/login', method: RequestMethod.POST },
        { path: '/users', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
