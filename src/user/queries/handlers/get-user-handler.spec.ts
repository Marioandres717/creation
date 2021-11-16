import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/repository/user.service';
import { GetUserHandler } from './get-user-handler';

describe('GetUserHandler', () => {
  let service: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaService],
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
  });
  it('should be defined', () => {
    expect(new GetUserHandler(service)).toBeDefined();
  });
});
