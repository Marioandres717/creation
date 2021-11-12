import * as clc from 'cli-color';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserService } from 'src/user/repository/user.service';
import { GetUserQuery } from '../impl/get-user-query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly repository: UserService) {}

  async execute(query: GetUserQuery) {
    try {
      const key = query.getUniqueKey();
      return key ? await this.repository.user(key) : null;
    } catch (error) {
      console.error(clc.red(`GetUserHandler: ${error.message}`));
      return null;
    }
  }
}
