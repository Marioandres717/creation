import * as clc from 'cli-color';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from 'src/user/repository/user/user.service';
import { GetUsersQuery } from '../impl/get-users-query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly repository: UserService) {}

  async execute(query: GetUsersQuery) {
    try {
      const { limit, offset, order, user } = query;
      return this.repository.users(limit, offset, order, user);
    } catch (error) {
      console.error(clc.red(`GetUsersHandler: ${error.message}`));
      return null;
    }
  }
}
