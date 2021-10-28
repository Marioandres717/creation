import { Prisma, User } from '.prisma/client';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/repository/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    UserWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User> {
    return await this.userService.user(UserWhereUniqueInput);
  }

  async login(user: Prisma.UserWhereUniqueInput): Promise<string> {
    const result = await this.validateUser(user);
    if (!result) throw new UnauthorizedException();
    return this.jwtService.sign(result);
  }
}
