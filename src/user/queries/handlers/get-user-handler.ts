import * as clc from 'cli-color';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserService } from 'src/user/repository/user/user.service';
import { GetUserQuery } from '../impl/get-user-query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly repository: UserService) {}

  async execute(query: GetUserQuery) {
    try {
      return await this.repository.user(query);
    } catch (error) {
      console.error(`GetUserHandler: ${clc.red(error.message)}`);
      return null;
    }
  }
}
