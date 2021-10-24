import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';

@Resolver()
export class AuthQueryResolver {
  constructor(private authService: AuthService) {}

  @Query('login')
  login(@Args('authId') authId: string) {
    return this.authService.login(authId);
  }
}
