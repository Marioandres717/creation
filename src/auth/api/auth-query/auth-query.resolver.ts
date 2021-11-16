import {
  Args,
  GraphQLExecutionContext,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { parseStringToNumber } from 'src/helper-functions';
import { AuthService } from 'src/auth/repository/auth.service';
import { Context } from 'src/auth/decorators/context.decorator';
import { User_WhereInput } from 'src/graphql';
import { UnauthorizedException } from '@nestjs/common';

@Resolver()
export class AuthQueryResolver {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Query('login')
  async login(
    @Args('user') user: User_WhereInput,
    @Context() context: GraphQLExecutionContext,
  ) {
    const id = parseStringToNumber(user.id);
    const authenticatedUser = await this.authService.validateUser({
      ...user,
      id,
    });

    if (!authenticatedUser) throw new UnauthorizedException();

    const { req } = context.getContext();
    const csrfToken = uuidv4();
    const jwtToken = this.jwtService.sign({
      ...authenticatedUser,
      _csrf: csrfToken,
    });
    req.res.cookie('access-token', jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 1800000, //30 min
    });
    req.res.cookie('_csrf', csrfToken, {
      maxAge: 1800000,
    });
    return true;
  }
}
