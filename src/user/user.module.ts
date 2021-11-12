import { Module } from '@nestjs/common';
import { UserQueryResolver } from './api/user-query/user-query.resolver';
import { UserMutationResolver } from './api/user-mutation/user-mutation.resolver';
import { UserService } from './repository/user.service';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './queries/handlers';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [CqrsModule],
  exports: [UserService],
  providers: [
    UserQueryResolver,
    UserMutationResolver,
    UserService,
    PrismaService,
    ...QueryHandlers,
  ],
})
export class UserModule {}
