import {
  Args,
  GraphQLExecutionContext,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { parseStringToNumber } from 'helper-functions';
import { AuthService } from 'src/auth/repository/auth.service';
import { Context } from 'src/auth/decorators/context.decorator';
import { User_WhereInput } from 'src/graphql';

@Resolver()
export class AuthQueryResolver {
  constructor(private authService: AuthService) {}

  @Query('login')
  async login(
    @Args('user') user: User_WhereInput,
    @Context() context: GraphQLExecutionContext,
  ) {
    const id = parseStringToNumber(user.id);
    const token = await this.authService.login({ ...user, id });
    if (!token) return false;
    const { req } = context.getContext();
    req.res.cookie('access-token', token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 1800000, //30 min
    });
    req.res.header('Authorization', token);
    return true;
  }
}
