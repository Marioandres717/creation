import { QueryBus } from '@nestjs/cqrs';
import { Query, Resolver, Args, Int } from '@nestjs/graphql';
import { User_type } from '.prisma/client';
import { User, User_OrderByInput, User_WhereInput } from 'src/graphql';
import { GetUserQuery } from 'src/user/queries/impl/get-user-query';
import { GetUsersQuery } from 'src/user/queries/impl/get-users-query';
import { parseStringToNumber } from 'helper-functions';

@Resolver('User')
export class UserQueryResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query('User')
  async user(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: User_WhereInput = {},
    @Args('orderBy') orderBy: User_OrderByInput,
  ): Promise<[User]> {
    const { id, email, username } = where;
    const integerId = parseStringToNumber(id);
    const getUniqueUser = id || email || username;
    if (getUniqueUser) {
      const result = await this.queryBus.execute<GetUserQuery, User>(
        new GetUserQuery(integerId, email, username),
      );
      return result ? [result] : null;
    } else {
      const prismaUserWhereInput = {
        ...where,
        ...{
          id: integerId,
          type: User_type[where.type],
          active: isNaN(Number(where.active))
            ? undefined
            : Number(where.active),
        },
      };
      return await this.queryBus.execute(
        new GetUsersQuery(limit, offset, orderBy, prismaUserWhereInput),
      );
    }
  }

  @Query('count_User')
  countUsers(): Promise<number> {
    throw new Error('Not Implemented');
  }
}
