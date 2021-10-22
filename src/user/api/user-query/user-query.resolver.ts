import { QueryBus } from '@nestjs/cqrs';
import { Query, Resolver, Args, Int } from '@nestjs/graphql';
import { User, User_OrderByInput, User_WhereInput } from 'src/graphql';
import { GetUserQuery } from 'src/user/queries/impl/get-user-query';

@Resolver('User')
export class UserQueryResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query()
  async User(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: User_WhereInput,
    @Args('orderBy') orderBy: User_OrderByInput,
  ): Promise<[User]> {
    const { id, email, username } = where;
    const validId = !id
      ? undefined
      : isNaN(Number(id))
      ? undefined
      : Number(id);
    const result = await this.queryBus.execute<GetUserQuery, User>(
      new GetUserQuery(validId, email, username),
    );

    return result ? [result] : null;
  }
}
