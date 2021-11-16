import { Prisma } from '.prisma/client';

export class GetUsersQuery {
  constructor(
    readonly limit: number = 10,
    readonly offset: number = 0,
    readonly order: Prisma.UserOrderByWithRelationInput = {},
    readonly user: Prisma.UserWhereInput = {},
  ) {}
}
