import { Module } from '@nestjs/common';
import { UserQueryResolver } from './api/user-query/user-query.resolver';
import { UserMutationResolver } from './api/user-mutation/user-mutation.resolver';

@Module({
  providers: [UserQueryResolver, UserMutationResolver],
})
export class UserModule {}
