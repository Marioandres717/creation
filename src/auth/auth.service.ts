import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/repository/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(UserWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    const user = await this.userService.user(UserWhereUniqueInput);
    return user;
  }

  async login(user: any) {
    return this.jwtService.sign({ ...user, expiresIn: 60 });
  }
}
