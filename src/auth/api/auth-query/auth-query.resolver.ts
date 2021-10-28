import { Args, Query, Resolver } from '@nestjs/graphql';
import { parseStringToNumber } from 'helper-functions';
import { AuthService } from 'src/auth/auth.service';
import { User, User_WhereInput } from 'src/graphql';

@Resolver()
export class AuthQueryResolver {
  constructor(private authService: AuthService) {}

  @Query('login')
  login(@Args('user') user: User_WhereInput) {
    const id = parseStringToNumber(user.id);
    return this.authService.login({ ...user, id });
  }
}
